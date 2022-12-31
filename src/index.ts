import "dotenv/config";
import { Scenes, session, Telegraf } from "telegraf";
import { Logger } from "tslog";
import startHandler from "./handlers/browser.handlers";
import browserMiddleware from "./middlewares/browser.middleware";
import controlsScene from "./scenes/controls.scene";
import textEnterScene from "./scenes/textEnter.scene";
import { MyContext } from "./types";

function configureBot(bot: Telegraf<MyContext>) {
    startHandler(bot);
}

async function main() {
    let log = new Logger({name: "bootstrap"});

    log.info("Starting...");

    const BOT_TOKEN = process.env.BOT_TOKEN;
    if (!BOT_TOKEN) {
        log.fatal("BOT_TOKEN is not defined");
        process.exit(1);
    }

    const bot = new Telegraf<MyContext>(BOT_TOKEN);
    const stage = new Scenes.Stage<MyContext>([
        controlsScene,
        textEnterScene
    ]);

    bot.use(session())
    bot.use(stage.middleware())
    bot.use(browserMiddleware)
    
    configureBot(bot);

    await bot.launch()
}

main();