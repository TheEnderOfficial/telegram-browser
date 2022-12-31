import puppeteer from "puppeteer";
import { Middleware } from "telegraf";
import { installMouseHelper } from "../utils/installMouseHelper";
import { MyContext } from "../types";

const browserMiddleware: Middleware<MyContext> = async (ctx, next) => {
  if (!ctx.session?.browser || !ctx.session.page) {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await installMouseHelper(page);
    await page.goto("https://google.com");
    await page.mouse.move(135, 173);

    // TODO: Fix this (TypeError: Cannot set properties of undefined (setting 'browser'))
    // @ts-ignore
    if (!ctx.session) ctx.session = {};

    ctx.session.browser = browser;
    ctx.session.page = page;
  }
  if (!ctx.session.x) {
    // TODO: Fix this (TypeError: Cannot set properties of undefined (setting 'browser'))
    // @ts-ignore
    if (!ctx.session) ctx.session = {};
    ctx.session.x = 0;
  }
  if (!ctx.session.y) {
    // TODO: Fix this (TypeError: Cannot set properties of undefined (setting 'browser'))
    // @ts-ignore
    if (!ctx.session) ctx.session = {};
    ctx.session.y = 0;
  }
  return next();
};

export default browserMiddleware;
