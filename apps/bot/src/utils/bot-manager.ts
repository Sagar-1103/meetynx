import { BrowserContext, Page } from "playwright";
import { Data } from "../types/data";
import { joinMeet } from "./meet";

interface BotData {
  meetingLink: string;
  context: BrowserContext;
  page: Page;
}

export class BotManager {
  private static bots = new Map<string, BotData>();

  static getBot(meetId: string): BotData | null {
    return this.bots.get(meetId) ?? null;
  }

  static async addBot(data: Data) {
    const bot = this.getBot(data.meetId);
    if (bot) return false;
    try {
      console.log(data.meetLink);
      const { success, context, page } = await joinMeet(data.meetLink);

      if (!success || !context || !page) return false;

      this.bots.set(data.meetId, { context, page, meetingLink: data.meetLink });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static removeBot(meetId: string) {
    const bot = this.getBot(meetId);
    if (!bot) return;
    this.bots.delete(meetId);
  }
}
