import { chromium } from "playwright";

const login = async () => {
  const context = await chromium.launchPersistentContext(
    "./google-profile",{
      headless: false,
      args: ["--disable-blink-features=AutomationControlled"],
    }
  );

  const page = await context.newPage();

  await page.goto("https://accounts.google.com");

};

login();
