import { appendFileSync } from "node:fs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function runCloudWorker(environment = process.env, fetcher = fetch, pause = sleep) {
  const mode = environment.WOLP_ENGINE_MODE;
  const origin = new URL(environment.WOLP_SITE_ORIGIN);
  if (origin.protocol !== "https:") throw new Error("Güvenli Wolp adresi gerekli");
  const jobId = environment.WOLP_JOB_ID;
  const token = mode === "recover" ? environment.WOLP_RECOVERY_TOKEN : environment.WOLP_JOB_TOKEN;
  if (!token || !environment.WOLP_SITES_ACCESS_TOKEN) throw new Error("Bulut çalışanının güvenli erişimi eksik");
  // These credentials exist only in trusted orchestration jobs, never in generated-code tests.
  process.stdout.write("::add-mask::" + token + "\n");
  async function call(action, extra = {}) {
    const response = await fetcher(new URL("/api/task-engine/worker", origin), {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(280_000),
      headers: { "content-type": "application/json", "OAI-Sites-Authorization": "Bearer " + environment.WOLP_SITES_ACCESS_TOKEN },
      body: JSON.stringify({ action, jobId, token, runId: environment.GITHUB_RUN_ID, ...extra }),
    });
    if (!response.ok) {
      const error = new Error("Wolp çalışanı HTTP " + response.status);
      error.status = response.status;
      throw error;
    }
    return response.json();
  }
  if (mode === "recover") return call("recover");
  if (mode === "finish") {
    let checks = [];
    try { checks = JSON.parse(Buffer.from(environment.WOLP_CHECK_REPORT || "W10=", "base64").toString()); } catch {}
    return call("finish", { checks, testResult: environment.WOLP_TEST_RESULT || "failure" });
  }
  if (mode === "abort") return call("abort");
  const heartbeat = setInterval(() => void call("heartbeat").catch(() => undefined), 30_000);
  let failures = 0;
  try {
    for (let round = 0; round < 100; round += 1) {
      let result;
      try { result = await call("step"); failures = 0; }
      catch (error) {
        if ([400, 401, 403, 404].includes(error.status) || ++failures >= 4) throw error;
        await pause(Math.min(60_000, 5_000 * 2 ** failures));
        continue;
      }
      if (result.ready) {
        if (!/^wolp\/[a-zA-Z0-9-]+$/.test(result.branch) || !/^[a-f0-9]{40}$/.test(result.headSha)) throw new Error("Geçersiz test dalı");
        if (environment.GITHUB_OUTPUT) appendFileSync(environment.GITHUB_OUTPUT, `ready=true\nbranch=${result.branch}\nhead_sha=${result.headSha}\n`);
        return result;
      }
      if (result.terminal) {
        if (result.state === "failed") throw new Error("Bulut görevi başarısız; ayrıntı Wolp'a kaydedildi");
        return result;
      }
      await pause(Math.max(1000, Math.min(60_000, result.retryAfterMs || 1000)));
    }
    throw new Error("Bulut çalışanının süre sınırı doldu");
  } finally { clearInterval(heartbeat); }
}

if (process.env.WOLP_ENGINE_MODE) runCloudWorker().catch((error) => { console.error(error.message); process.exitCode = 1; });
