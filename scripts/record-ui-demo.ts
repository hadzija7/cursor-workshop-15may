/**
 * Records a short browser demo of the cafe planner (multi-quantity UI).
 * Requires `pnpm dev` on BASE_URL (default http://localhost:3000; avoid 127.0.0.1 with Next.js dev cross-origin rules).
 * Writes video to ARTIFACTS_DIR (default /opt/cursor/artifacts).
 */
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const ARTIFACTS_DIR = process.env.ARTIFACTS_DIR ?? "/opt/cursor/artifacts";
const OUT_WEBM = join(ARTIFACTS_DIR, "cafe-planner-multi-qty-demo.webm");
const OUT_MP4 = join(ARTIFACTS_DIR, "cafe-planner-multi-qty-demo.mp4");

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  await mkdir(ARTIFACTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    recordVideo: {
      dir: ARTIFACTS_DIR,
      size: { width: 1400, height: 900 },
    },
  });
  const page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 120_000 });
  await page.getByRole("heading", { name: "Cursor Cafe Planner" }).waitFor();
  // Client component: wait for hydrated meal actions.
  await page
    .getByRole("button", { name: /Sunny Noodle Bowls to plan/ })
    .waitFor({ state: "visible", timeout: 30_000 });
  await sleep(600);

  const plan = page.locator("aside").first();

  await page
    .getByRole("button", { name: "Add Sunny Noodle Bowls to plan" })
    .click();
  await plan
    .locator("li")
    .filter({ hasText: "Sunny Noodle Bowls" })
    .waitFor({ state: "visible", timeout: 15_000 });
  await sleep(400);

  await plan
    .getByRole("button", { name: "Increase quantity of Sunny Noodle Bowls" })
    .click();
  await sleep(450);
  await plan
    .getByRole("button", { name: "Increase quantity of Sunny Noodle Bowls" })
    .click();
  await sleep(500);

  await page
    .getByRole("button", { name: "Add Desk Picnic Wraps to plan" })
    .click();
  await plan
    .locator("li")
    .filter({ hasText: "Desk Picnic Wraps" })
    .waitFor({ state: "visible", timeout: 15_000 });
  await sleep(500);

  await page
    .getByRole("button", {
      name: /Add another Sunny Noodle Bowls/,
    })
    .click();
  await sleep(500);

  await plan
    .getByRole("button", {
      name: "Decrease quantity of Sunny Noodle Bowls",
    })
    .click();
  await sleep(800);

  await plan.scrollIntoViewIfNeeded();
  await sleep(1200);

  const video = page.video();
  await page.close();
  if (video) {
    await video.saveAs(OUT_WEBM);
  }
  await context.close();
  await browser.close();

  const { execFileSync } = await import("node:child_process");
  try {
    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-i",
        OUT_WEBM,
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-an",
      OUT_MP4,
    ],
    { stdio: "inherit" },
    );
  } catch {
    console.warn("ffmpeg mp4 transcode skipped or failed; webm artifact remains at", OUT_WEBM);
  }

  console.log("Demo recordings:", OUT_WEBM, OUT_MP4);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
