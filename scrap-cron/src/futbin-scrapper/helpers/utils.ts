import { webkit } from 'playwright';

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type IPlayerCallback = (els: (SVGElement | HTMLElement)[]) => any[];
/**
 * Sleeps the execution for a random amount of time between min and max
 * @param min minimum time to sleep in milliseconds
 * @param max maximum time to sleep in milliseconds
 * @returns Promise<void>
 */
export const scrapSleep = async (min: number, max: number) => sleep(rand(min, max));

/**
 * Basic Scaffold for Playwright HTML scrapper
 * @param url full url to scrap
 * @param selector css selector to get the element from the page
 * @param type return type of the value (string or number)
 * @returns Promise<string | number>
 */
export async function singleValueHtmlScrapper(url: string, selector: string, type: 'string'): Promise<string>;
export async function singleValueHtmlScrapper(url: string, selector: string, type: 'number'): Promise<number>;
export async function singleValueHtmlScrapper(url: string, selector: string, type: 'string' | 'number') {
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url);
    const value = await page.$eval(selector, (el) => el.textContent);
    return type === 'number' ? +value : value;
  } catch (error) {
    return error;
  } finally {
    await browser.close();
  }
}

export const multiValueHtmlScrapper = async (url: string, selector: string, callback: IPlayerCallback) => {
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const defaultCallback: IPlayerCallback = (els) => els.map((el) => el.textContent);
  try {
    await page.goto(url);

    const c = callback ? callback : defaultCallback;
    const values = await page.$$eval(selector, c);

    return values;
  } catch (error) {
    return error;
  } finally {
    await browser.close();
  }
};
