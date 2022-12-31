// create scene
import { Scenes } from "telegraf";
import { MyContext } from "../types";

const textEnterScene = new Scenes.BaseScene<MyContext>("textEnter");

textEnterScene.enter(async (ctx) => {
    await ctx.reply("Enter text (it will be sent to the page):");

    ctx.session.textEnterScene__text = "";
    ctx.session.textEnterScene__entering = true;
});

textEnterScene.on("text", async (ctx) => {
    ctx.session.textEnterScene__text += ctx.message.text;

    await ctx.scene.leave();
    await ctx.scene.enter("controls");
});

export default textEnterScene;