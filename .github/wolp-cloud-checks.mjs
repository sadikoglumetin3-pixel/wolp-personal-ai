import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

export function runChecks(directory = process.cwd(), execute = spawnSync) {
  const results = [];
  function run(label, command, args, timeout = 600_000) {
    const result = execute(command, args, { cwd: directory, encoding: "utf8", timeout, env: process.env, maxBuffer: 4 * 1024 * 1024 });
    results.push({ label, ok: result.status === 0, output: [result.stdout, result.stderr, result.error?.message].filter(Boolean).join("\n").slice(-2400) });
    return result.status === 0;
  }
  const has = (file) => existsSync(directory + "/" + file);
  if (has("package.json")) {
    const scripts = JSON.parse(readFileSync(directory + "/package.json", "utf8")).scripts || {};
    let manager = "npm";
    if (has("pnpm-lock.yaml")) manager = "pnpm";
    else if (has("yarn.lock")) manager = "yarn";
    const corepackReady = manager === "npm" || run("Paket yöneticisi", "corepack", ["enable"], 120_000);
    const installed = corepackReady && run("Bağımlılıklar", manager, manager === "npm" ? [has("package-lock.json") ? "ci" : "install"] : manager === "pnpm" ? ["install", "--frozen-lockfile"] : ["install", "--immutable"], 900_000);
    if (installed) {
      for (const name of ["test", "build"]) if (scripts[name]) run(name === "test" ? "Test" : "Derleme", manager, ["run", name], 900_000);
    }
  }
  if (!results.length) results.push({ label: "Otomatik test", ok: true, output: "Bu projede tanımlı bir test komutu yok; test çalıştırıldığı iddia edilmez." });
  return results;
}

if (process.env.WOLP_RUN_CHECKS === "1") {
  try {
    const results = runChecks();
    if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, "report=" + Buffer.from(JSON.stringify(results)).toString("base64") + "\n");
    process.exitCode = results.some((item) => !item.ok) ? 1 : 0;
  } catch { process.exitCode = 1; }
}
