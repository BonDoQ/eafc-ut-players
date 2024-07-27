import { Page } from 'playwright';
import selectiveWhitespace from 'selective-whitespace';
import { DPlayer } from './directus.schema';

const basicParser = (selector: string, type: 'string' | 'number') => async (page: Page) => {
  try {
    const value = await page.$eval(selector, (el) => el.textContent);
    return type === 'string' ? selectiveWhitespace(value) : parseInt(value, 10);
  } catch (error) {
    return type === 'string' ? '-1' : -1;
  }
};

const statParser = (stat: string) => {
  return basicParser(`.player-stat-row:has(.player-stat-name:text("${stat}")) >> .player-stat-value`, 'number');
};

const priceParser = (selector: string) => async (page) => {
  const price = await basicParser(selector, 'string')(page);
  return parseInt(price.replace(/,/g, ''), 10);
};

const dateOfBirthParser = async (page: Page) => {
  try {
    const date = await page.$eval(
      `.narrow-table tr:has(th:text("Age")) >> .inline-popup-content`,
      (el) => el.textContent,
    );
    const [day, month, year] = date.split(' - ')[1].split('-');
    return `${month}/${day}/${year}`;
  } catch (error) {
    return '-1';
  }
};

const playerStylesParser = async (page: Page) => {
  return await page.$$eval('.player-traits>>nth=1 >> .small-row', (els) => {
    return els
      .map((el) => el.querySelector('.green-text').textContent)
      .map((value) => `u'${value.trim()}'`)
      .join(', ')
      .trimStart();
  });
};

const playerStylesPlusParser = async (page: Page) => {
  return await page.$$eval('.player-traits>>nth=0 >> .small-row', (els) => {
    return els
      .map((el) => el.querySelector('.green-text').textContent)
      .map((value) => `u'${value.trim()}'`)
      .join(', ')
      .trimStart();
  });
};

const secondaryPositionParser = async (page: Page) => {
  const value = await basicParser('.narrow-table tr:has(th:text("Alt POS")) >> td', 'string')(page);
  return value.split(',').join(' ');
};

const nationParser = async (page: Page) => {
  try {
    const value = await page.$eval('.narrow-table tr:has(th:text("Nation")) >> td >> a', (el) =>
      el.getAttribute('href'),
    );
    return parseInt(value.split('/')[3], 10);
  } catch (error) {
    return -1;
  }
};

const genderParser = async (page: Page) => {
  try {
    const value = await page.$eval('.player-text-section', (el) => el.textContent);
    return value.indexOf('she') > -1 ? 'W' : 'M';
  } catch (error) {
    return '-1';
  }
};

const cardVersionParser = async (page: Page) => {
  try {
    const url = await page.$eval('.player-card-wrapper:not([hidden]) >> img.playercard-24-bg', (el) =>
      el.getAttribute('src'),
    );
    return url.split('?')[0].split('%2F').reverse()[0].split('.')[0];
  } catch (error) {
    return null;
  }
};

const imgParser = async (page: Page) => {
  try {
    const baseImageUrl = await page
      .$eval('.player-card-wrapper:not([hidden]) >> img.playercard-24-base-img', (el) => el.getAttribute('src'))
      .catch(() => null);
    const specialImageUrl = await page
      .$eval('.player-card-wrapper:not([hidden]) >> img.playercard-24-special-img', (el) => el.getAttribute('src'))
      .catch(() => null);
    const url = specialImageUrl || baseImageUrl;

    return url ? decodeURIComponent(url.split('/').reverse()[0]).split('?')[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

type IPlayerMapper<T> = {
  [p in keyof T]?: (page: Page) => Promise<any>;
};

export const PlayerHTMLScrapper: IPlayerMapper<DPlayer> = {
  fullname: basicParser('.narrow-table tr:has(th:text("Name")) >> td', 'string'),
  club_id: basicParser('.narrow-table tr:has(th:text("Club ID")) >> td', 'number'),
  nation_id: nationParser,
  league_id: basicParser('.narrow-table tr:has(th:text("League ID")) >> td', 'number'),
  card_id: cardVersionParser,
  img: imgParser,
  overall_pace: statParser('pace'),
  overall_shooting: statParser('shooting'),
  overall_passing: statParser('passing'),
  overall_dribbling: statParser('dribbling'),
  overall_defending: statParser('defending'),
  overall_physicality: statParser('physical'),
  position: basicParser('.player-card-wrapper:not([hidden]) >> .playercard-24-position', 'string'),
  foot: basicParser('.narrow-table tr:has(th:text-is("Foot")) >> td', 'string'),
  height: basicParser('.narrow-table tr:has(th:text("Height")) >> td', 'string'),
  weight: basicParser('.narrow-table tr:has(th:text("Weight")) >> td', 'number'),
  date_of_birth: dateOfBirthParser,
  rating: basicParser('.player-card-wrapper:not([hidden]) >> .playercard-24-rating', 'number'),
  weak_foot: basicParser('.narrow-table tr:has(th:text("Weak Foot")) >> td', 'number'),
  skills: basicParser('.narrow-table tr:has(th:text("Skills")) >> td', 'number'),
  defensive_workrate: basicParser('.narrow-table tr:has(th:text("Def. WR")) >> td', 'string'),
  attack_workrate: basicParser('.narrow-table tr:has(th:text("Att. WR")) >> td', 'string'),
  acceleration: statParser('Acceleration'),
  aggression: statParser('Aggression'),
  agility: statParser('Agility'),
  balance: statParser('Balance'),
  ballcontrol: statParser('Ball Control'),
  crossing: statParser('Crossing'),
  curve: statParser('Curve'),
  dribbling: statParser('Dribbling'),
  finishing: statParser('Finishing'),
  headingaccuracy: statParser('Heading Acc.'),
  interceptions: statParser('Interceptions'),
  jumping: statParser('Jumping'),
  longpassing: statParser('Long Pass'),
  longshots: statParser('Long Shots'),
  marking: statParser('Def. Aware'),
  penalties: statParser('Penalties'),
  positioning: statParser('Att. Position'),
  reactions: statParser('Reactions'),
  shortpassing: statParser('Short Pass'),
  freekickaccuracy: statParser('FK Acc.'),
  shotpower: statParser('Shot Power'),
  slidingtackle: statParser('Slide Tackle'),
  sprintspeed: statParser('Sprint Speed'),
  standingtackle: statParser('Stand Tackle'),
  stamina: statParser('Stamina'),
  strength: statParser('Strength'),
  vision: statParser('Vision'),
  volleys: statParser('Volleys'),
  composure: statParser('Composure'),
  accele_rate: basicParser('.narrow-table tr:has(th:text("AcceleRATE")) >> td', 'string'),
  gender: genderParser,
  player_styles: playerStylesParser,
  player_styles_plus: playerStylesPlusParser,
  secondary_position: secondaryPositionParser,
};

export const KeeperHTMLScrapper: IPlayerMapper<DPlayer> = {
  gk_overall_diving: statParser('Diving'),
  gk_overall_handling: statParser('Handling'),
  gk_overall_kicking: statParser('Kicking'),
  gk_overall_reflexes: statParser('Reflexes'),
  gk_overall_speed: statParser('Speed'),
  gk_overall_positioning: statParser('Positioning'),
};

export const PriceHTMLScrapper: IPlayerMapper<DPlayer> = {
  ps_price: priceParser('.player-header-prices-section >> .price-box.player-price-not-pc>>nth=-1 >> .lowest-price-1'),
  pc_price: priceParser('.player-header-prices-section >> .price-box.player-price-not-ps>>nth=-1 >> .lowest-price-1'),
};
