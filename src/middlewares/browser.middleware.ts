import puppeteer from "puppeteer";
import {Middleware} from "telegraf";
import { MyContext } from "../types";

const browserMiddleware: Middleware<MyContext> = async (ctx, next) => {
    if (!ctx.browser) {
        ctx.browser = await puppeteer.launch();
    }

    return next();
}

export default browserMiddleware;