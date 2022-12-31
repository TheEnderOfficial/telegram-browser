import { Telegraf } from "telegraf";
import { Handler, MyContext } from "../types";

const startHandler: Handler = (bot) => {
  bot.start(Telegraf.reply("Hello!"));
};

export default startHandler;