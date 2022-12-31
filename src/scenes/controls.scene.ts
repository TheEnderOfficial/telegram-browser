import { MyContext } from "../types";
import { Telegraf, Scenes, Markup } from "telegraf";
import createPageScreenshotToBuffer from "../utils/createPageScreenshotToBuffer";
import move, { Direction } from "../utils/smoothMouse";
import wrap from "../utils/retryWrapper";
import { Page } from "puppeteer";

const controlsScene = new Scenes.BaseScene<MyContext>("controls");

let types = ["left", "right", "up", "down", "click"];
let types_ = ["left", "right", "up", "down"];
let types_emojis = ["⬅️", "➡️", "⬆️", "⬇️"];
let types2 = [1, 10, 0.5, 0.1];

let generateKeyboard = () => Markup.inlineKeyboard([
    ...types2.map((type2, index2) =>[
        ...types_.map((type, index2) => Markup.button.callback(types_emojis[index2] + " " + type2, type + "_" + type2))
    ]),
    [Markup.button.callback("👆", "click")],
    [Markup.button.callback("⌨", "textEnter")],
  ]);

controlsScene.enter(async (ctx) => {
  let loadingMessage = await ctx.reply("Loading controls...");


  let controls = generateKeyboard()

  if (ctx.session.textEnterScene__entering) {
    ctx.session.textEnterScene__entering = false;
    await ctx.session.page.keyboard.type(ctx.session.textEnterScene__text);
  }

  let screenShot = await (wrap<Page, Buffer>(createPageScreenshotToBuffer))(ctx.session.page);


  await ctx.deleteMessage(loadingMessage.message_id);
  await ctx.replyWithPhoto(
    {
      source: screenShot ?? Buffer.from(""),
    },
    {
      ...controls,
      caption: "Current page: " + ctx.session.page.url(),
    }
  );
});


let updateMessage = async (ctx: MyContext) => {
    let pageUrl = ctx.session.page.url();
    let screenShot;
    try {
        screenShot = await (wrap<Page, Buffer>(createPageScreenshotToBuffer))(ctx.session.page);

    }
    catch (e) {
        console.log(e);
    }

    await ctx.editMessageMedia({
        type: "photo",
        media: {
            source: screenShot ?? Buffer.from(""),
        },
        caption: "Current page: " + pageUrl,
    }, {
        ...generateKeyboard(),
    });
};

types_.forEach((type) => {
  types2.forEach((type2) => {
    let name = type + "_" + type2;

    controlsScene.action(name, async (ctx) => {
      await move(ctx.session.page, type as Direction, ctx, type2 * 75);
      await ctx.answerCbQuery();
      await updateMessage(ctx);
    });
  });
});

controlsScene.action("click", async (ctx) => {
    await move(ctx.session.page, "click" as Direction, ctx);
    await ctx.answerCbQuery();
    await updateMessage(ctx);
    
});

controlsScene.action("textEnter", async (ctx) => {
    await ctx.scene.enter("textEnter");
});



export default controlsScene;
