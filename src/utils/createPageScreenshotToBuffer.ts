import { Page, ScreenshotOptions } from "puppeteer";

export default function createPageScreenshotToBuffer(
  page: Page,
  options?: ScreenshotOptions
): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const b64string: string = (await page.screenshot({
      encoding: "base64",
      fullPage: true,
      ...options,
    })) as string;
    const buffer: Buffer = Buffer.from(b64string, "base64");
    resolve(buffer);
  });
}