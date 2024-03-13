import { Page } from 'playwright';
import selectiveWhitespace from 'selective-whitespace';

const basicParser = (selector: string, type: 'string' | 'number') => async (page: Page) => {
  const value = await page.$eval(selector, (el) => el.textContent);
  return type === 'string' ? selectiveWhitespace(value) : parseInt(value, 10);
};

const dateOfBirthParser = async (page: Page) => {
  const date = await page.$eval(`.table-info tr:has(th:text("Age")) >> .table-row-text >> a`, (el) =>
    el.getAttribute('title'),
  );
  const [day, month, year] = date.split(' - ')[1].split('-');
  return `${month}/${day}/${year}`;
};

const playerStylesParser = async (page: Page) => {
  return await page.$$eval('.traits-holder', (els) => {
    return els
      .filter((el) => el.innerHTML.indexOf('plus') == -1)
      .map((el) => el.querySelector('.trait-name-val').textContent)
      .map((value) => `u'${value.trim()}'`)
      .join(', ')
      .trimStart();
  });
};

const playerStylesPlusParser = async (page: Page) => {
  return await page.$$eval('.traits-holder', (els) => {
    return els
      .filter((el) => el.innerHTML.indexOf('plus') > -1)
      .map((el) => el.querySelector('.trait-name-val').textContent)
      .map((value) => `u'${value.trim()}'`)
      .join(', ')
      .trimStart();
  });
};

const secondaryPositionParser = async (page: Page) => {
  return await page.$$eval('.pcdisplay-alt-pos>>nth=1 >> .alt-pos-sub', (els) =>
    els.map((el) => el.textContent).join(' '),
  );
};

const nationParser = async (page: Page) => {
  const value = await page.$eval('.table-info tr:has(th:text("Nation")) >> .table-row-text >> a', (el) =>
    el.getAttribute('href'),
  );
  return parseInt(value.split('/')[3], 10);
};

const genderParser = async (page: Page) => {
  const value = await page.$eval('.item-full-info', (el) => el.textContent);
  return value.indexOf('she') > -1 ? 'W' : 'M';
};

export const PlayerHTMLScrapper = {
  fullname: basicParser('.table-info tr:has(th:text("Name")) >> .table-row-text', 'string'),
  club: basicParser('.table-info tr:has(th:text("Club ID")) >> .table-row-text', 'number'),
  nation: nationParser,
  league: basicParser('.table-info tr:has(th:text("League ID")) >> .table-row-text', 'number'),
  overallPace: basicParser('#main-pace-val-0 .stat_val', 'number'),
  overallShooting: basicParser('#main-shooting-val-0 .stat_val', 'number'),
  overallPassing: basicParser('#main-passing-val-0 .stat_val', 'number'),
  overallDribbling: basicParser('#main-dribblingp-val-0 .stat_val', 'number'),
  overallDefending: basicParser('#main-defending-val-0 .stat_val', 'number'),
  overallPhysicality: basicParser('#main-heading-val-0 .stat_val', 'number'),
  position: basicParser('.pcdisplay-pos>>nth=0', 'string'),
  foot: basicParser('.table-info tr:has(th:text("Foot")) >> .table-row-text', 'string'),
  height: basicParser('.table-info tr:has(th:text("Height")) >> .table-row-text', 'string'),
  weight: basicParser('.table-info tr:has(th:text("Weight")) >> .table-row-text', 'number'),
  dateOfBirth: dateOfBirthParser,
  rating: basicParser('.pcdisplay-rat>>nth=0', 'number'),
  weakFoot: basicParser('.table-info tr:has(th:text("Weak Foot")) >> .table-row-text', 'number'),
  skills: basicParser('.table-info tr:has(th:text("Skills")) >> .table-row-text', 'number'),
  defensiveWorkrate: basicParser('.table-info tr:has(th:text("Def. WR")) >> .table-row-text', 'string'),
  attackWorkrate: basicParser('.table-info tr:has(th:text("Att. WR")) >> .table-row-text', 'string'),
  acceleration: basicParser('#sub-acceleration-val-0 .stat_val', 'number'),
  aggression: basicParser('#sub-aggression-val-0 .stat_val', 'number'),
  agility: basicParser('#sub-agility-val-0 .stat_val', 'number'),
  balance: basicParser('#sub-balance-val-0 .stat_val', 'number'),
  ballcontrol: basicParser('#sub-ballcontrol-val-0 .stat_val', 'number'),
  crossing: basicParser('#sub-crossing-val-0 .stat_val', 'number'),
  curve: basicParser('#sub-curve-val-0 .stat_val', 'number'),
  dribbling: basicParser('#sub-dribbling-val-0 .stat_val', 'number'),
  finishing: basicParser('#sub-finishing-val-0 .stat_val', 'number'),
  headingaccuracy: basicParser('#sub-headingaccuracy-val-0 .stat_val', 'number'),
  interceptions: basicParser('#sub-interceptions-val-0 .stat_val', 'number'),
  jumping: basicParser('#sub-jumping-val-0 .stat_val', 'number'),
  longpassing: basicParser('#sub-longpassing-val-0 .stat_val', 'number'),
  longshots: basicParser('#sub-longshotsaccuracy-val-0 .stat_val', 'number'),
  marking: basicParser('#sub-marking-val-0 .stat_val', 'number'),
  penalties: basicParser('#sub-penalties-val-0 .stat_val', 'number'),
  positioning: basicParser('#sub-positioning-val-0 .stat_val', 'number'),
  reactions: basicParser('#sub-reactions-val-0 .stat_val', 'number'),
  shortpassing: basicParser('#sub-shortpassing-val-0 .stat_val', 'number'),
  freekickaccuracy: basicParser('#sub-freekickaccuracy-val-0 .stat_val', 'number'),
  shotpower: basicParser('#sub-shotpower-val-0 .stat_val', 'number'),
  slidingtackle: basicParser('#sub-slidingtackle-val-0 .stat_val', 'number'),
  sprintspeed: basicParser('#sub-sprintspeed-val-0 .stat_val', 'number'),
  standingtackle: basicParser('#sub-standingtackle-val-0 .stat_val', 'number'),
  stamina: basicParser('#sub-stamina-val-0 .stat_val', 'number'),
  strength: basicParser('#sub-strength-val-0 .stat_val', 'number'),
  vision: basicParser('#sub-vision-val-0 .stat_val', 'number'),
  volleys: basicParser('#sub-volleys-val-0 .stat_val', 'number'),
  composure: basicParser('#sub-composure-val-0 .stat_val', 'number'),
  acceleRATE: basicParser('.table-info tr:has(th:text("AcceleRATE")) >> .table-row-text >> a', 'string'),
  gender: genderParser,
  playerStyles: playerStylesParser,
  playerStylesPlus: playerStylesPlusParser,
  secondaryPosition: secondaryPositionParser,
};

export const KeeperHTMLScrapper = {
  overallDiving: basicParser('#main-gkdiving-val-0 .stat_val', 'number'),
  overallHandling: basicParser('#main-gkhandling-val-0 .stat_val', 'number'),
  overallKicking: basicParser('#main-gkkicking-val-0 .stat_val', 'number'),
  overallReflexes: basicParser('#main-gkreflexes-val-0 .stat_val', 'number'),
  overallSpeed: basicParser('#main-speed-val-0 .stat_val', 'number'),
  overallPositioning: basicParser('#main-gkpositioning-val-0 .stat_val', 'number'),
};
