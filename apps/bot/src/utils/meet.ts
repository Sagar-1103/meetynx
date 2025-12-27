import { BrowserContext, chromium, Page } from "playwright";

const handlePermissions = async (page: Page) => {
  const permissionButton = page.getByRole("button", {
    name: /continue without/i,
  });
  const isPermissionButtonVisible = await permissionButton.isVisible();
  if (isPermissionButtonVisible) {
    permissionButton.click();
  }
};

export const joinMeet = async (meetLink: string) => {
  const url = new URL(meetLink);

  if (!url.searchParams.has("authuser")) {
    url.searchParams.set("authuser", "0");
  }

  if (!url.searchParams.has("hl")) {
    url.searchParams.set("hl", "en");
  }

  try {
    const context = await chromium.launchPersistentContext("./google-profile", {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--mute-audio",
        "--use-fake-ui-for-media-stream",
        "--disable-features=IsolateOrigins,site-per-process",
        "--disable-blink-features=AutomationControlled",
      ],
    });

    const page = await context.newPage();

    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto(url.toString(), { waitUntil: "networkidle" });

    await page.waitForTimeout(5000);

    console.log("page loaded");
    await page.screenshot({ path: "meet-debug-1.png", fullPage: true });

    await handlePermissions(page);

    await page.waitForTimeout(5000);

    await page.screenshot({ path: "meet-debug-2.png", fullPage: true });

    await page
      .getByRole("button", { name: /join now|ask to join/i })
      .click({ timeout: 5000 });

    await page.screenshot({ path: "meet-debug-3.png", fullPage: true });

    console.log("joined the meet");

    await page.waitForTimeout(5000);

    await handlePermissions(page);

    await page.waitForTimeout(5000);

    return { success: true, context, page };
  } catch (error) {
    return { success: false, context: null, page: null };
  }
};

export const leaveMeet = async(context:BrowserContext,page:Page) =>{
  try {
    
  } catch (error) {
    console.log("Error removing bot from the meet: ",error);
    return { success:false };
  }
}