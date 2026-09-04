import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const WOLP_RUNNER_VERSION = "1";
const taskId = process.env.WOLP_TASK_ID;
const branch = process.env.WOLP_TASK_BRANCH;
const base = process.env.WOLP_BASE_BRANCH || "main";
const summary = process.env.WOLP_TASK_SUMMARY || "Wolp Coding Agent değişiklikleri";

if (!taskId || !branch) throw new Error("Wolp görev bilgisi eksik");

const results = [];
function run(label, command, args, timeout = 600000) {
  const result = spawnSync(command, args, { encoding: "utf8", timeout, env: process.env });
  const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
  results.push({ label, ok: result.status === 0, output: output.slice(-5000) });
  return result.status === 0;
}

if (existsSync("package.json")) {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const scripts = pkg.scripts || {};
  if (existsSync("package-lock.json")) run("Bağımlılıklar", "npm", ["ci"], 900000);
  else if (existsSync("pnpm-lock.yaml")) {
    run("Corepack", "corepack", ["enable"], 120000);
    run("Bağımlılıklar", "pnpm", ["install", "--frozen-lockfile"], 900000);
  } else if (existsSync("yarn.lock")) {
    run("Corepack", "corepack", ["enable"], 120000);
    run("Bağımlılıklar", "yarn", ["install", "--immutable"], 900000);
  }
  if (scripts.test) run("Test", "npm", ["test"]);
  if (scripts.lint) run("Kod kontrolü", "npm", ["run", "lint"]);
  if (scripts.build) run("Derleme", "npm", ["run", "build"], 900000);
}

if (!results.length) results.push({ label: "Otomatik kontrol", ok: true, output: "Bu repo için tanınan otomatik test komutu bulunmadı." });

const failed = results.filter((item) => !item.ok);
const report = results.map((item) =>
  "### " + (item.ok ? "✅" : "❌") + " " + item.label + "\n\n" + (item.output ? "~~~text\n" + item.output + "\n~~~" : "Çıktı yok.")
).join("\n\n");
const body = [
  "## Wolp Coding Agent",
  "",
  summary,
  "",
  "Görev: " + taskId,
  "",
  "## Otomatik kontroller",
  "",
  report,
  "",
  failed.length ? "⚠️ Bazı kontroller başarısız. Birleştirmeden önce incele." : "✅ Çalıştırılabilen kontroller başarılı.",
].join("\n");

const existing = spawnSync("gh", ["pr", "list", "--head", branch, "--state", "all", "--json", "number", "--jq", ".[0].number"], { encoding: "utf8", env: process.env });
if (!existing.stdout.trim()) {
  const title = failed.length ? "[Kontrol gerekli] " + summary : summary;
  const created = spawnSync("gh", ["pr", "create", "--draft", "--base", base, "--head", branch, "--title", title.slice(0, 240), "--body", body], { encoding: "utf8", env: process.env });
  if (created.status !== 0) throw new Error(created.stderr || "PR oluşturulamadı");
}
