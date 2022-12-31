import "dotenv/config";
import { Telegraf } from "telegraf";
import { Logger } from "tslog";
import startHandler from "./handlers/start.handler";
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

    configureBot(bot);

    await bot.launch()
}

main();