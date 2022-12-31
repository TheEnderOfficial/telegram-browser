import { Context, Telegraf } from "telegraf";

export interface MyContext extends Context {

}

export type Handler = (bot: Telegraf<MyContext>) => void;