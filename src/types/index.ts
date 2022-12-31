import { Browser, Page } from "puppeteer";
import { Context, Telegraf, Scenes } from "telegraf";

interface MySession extends Scenes.SceneSession {
  browser: Browser;
  page: Page;
  x: number;
  y: number;
  textEnterScene__text: string;
  textEnterScene__entering: boolean;
}

export interface MyContext extends Context {
  session: MySession;
  scene: Scenes.SceneContextScene<MyContext>;
}

export type Handler = (bot: Telegraf<MyContext>) => void;
