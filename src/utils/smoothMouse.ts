import { Page } from "puppeteer";
import { MyContext } from "../types";

export enum Direction {
  Click = "click",
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export default async function move(page: Page, dir: Direction, ctx: MyContext, mouseModifier: number = 75) {
  let x = ctx.session.x;
  let y = ctx.session.y;
  if (dir === Direction.Click) await page.mouse.click(x, y);
  if (dir === Direction.Up && y <= 1080) {
    await page.mouse.move(x, y - mouseModifier);
    y -= mouseModifier;
  }
  if (dir === Direction.Down && y <= 1080) {
    await page.mouse.move(x, y + mouseModifier);
    y += mouseModifier;
  }
  if (dir === Direction.Left && x <= 1920) {
    await page.mouse.move(x - mouseModifier, y);
    x -= mouseModifier;
  }
  if (dir === Direction.Right && x <= 1920) {
    await page.mouse.move(x + mouseModifier, y);
    x += mouseModifier;
  }
  ctx.session.x = x;
  ctx.session.y = y;
}
