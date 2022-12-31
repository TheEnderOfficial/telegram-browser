import { Browser } from "puppeteer";
import { Context, Telegraf } from "telegraf";

export interface MyContext extends Context {
    browser: Browser | undefined;
}

export type Handler = (bot: Telegraf<MyContext>) => void;