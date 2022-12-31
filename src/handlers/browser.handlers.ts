import { Telegraf } from "telegraf";
import { Handler, MyContext } from "../types";
import createPageScreenshotToBuffer from "../utils/createPageScreenshotToBuffer";

const startHandler: Handler = (bot) => {
  bot.command("controls", async ctx => {
    await ctx.scene.enter("controls");
  })

  bot.start(async (ctx) => {
    await ctx.scene.enter("controls");
  });
};

export default startHandler;
