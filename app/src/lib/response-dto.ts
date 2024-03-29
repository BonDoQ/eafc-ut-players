import { DCard, DClub, DLeague, DNation, DPlayer } from './directus';

/**
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Player:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: The unique identifier of the player.
 *       date_created:
 *         type: string
 *         format: date-time
 *         description: The creation date of the player.
 *       fullname:
 *         type: string
 *         description: The full name of the player.
 *       ps_price:
 *         type: integer
 *         description: The price of the player on the PlayStation.
 *       pc_price:
 *          type: integer
 *          description: The price of the player on the Xbox.
 *       overall_pace:
 *         type: integer
 *         description: The overall pace of the player.
 *       overall_shooting:
 *         type: integer
 *         description: The overall shooting ability of the player.
 *       overall_passing:
 *         type: integer
 *         description: The overall passing ability of the player.
 *       overall_dribbling:
 *         type: integer
 *         description: The overall dribbling ability of the player.
 *       overall_defending:
 *         type: integer
 *         description: The overall defending ability of the player.
 *       overall_physicality:
 *         type: integer
 *         description: The overall physicality of the player.
 *       gk_overall_diving:
 *         type: integer
 *         description: The overall diving ability of the player as a goalkeeper.
 *       gk_overall_handling:
 *         type: integer
 *         description: The overall handling ability of the player as a goalkeeper.
 *       gk_overall_kicking:
 *         type: integer
 *         description: The overall kicking ability of the player as a goalkeeper.
 *       gk_overall_reflexes:
 *         type: integer
 *         description: The overall reflexes of the player as a goalkeeper.
 *       gk_overall_speed:
 *         type: integer
 *         description: The overall speed of the player as a goalkeeper.
 *       gk_overall_positioning:
 *         type: integer
 *         description: The overall positioning ability of the player as a goalkeeper.
 *       composure:
 *         type: integer
 *         description: The composure of the player.
 *       volleys:
 *         type: integer
 *         description: The volleying ability of the player.
 *       acceleration:
 *         type: integer
 *         description: The acceleration of the player.
 *       aggression:
 *         type: integer
 *         description: The aggression of the player.
 *       agility:
 *         type: integer
 *         description: The agility of the player.
 *       balance:
 *         type: integer
 *         description: The balance of the player.
 *       ballcontrol:
 *         type: integer
 *         description: The ball control ability of the player.
 *       crossing:
 *         type: integer
 *         description: The crossing ability of the player.
 *       curve:
 *         type: integer
 *         description: The curve of the player.
 *       dribbling:
 *         type: integer
 *         description: The dribbling ability of the player.
 *       finishing:
 *         type: integer
 *         description: The finishing ability of the player.
 *       headingaccuracy:
 *         type: integer
 *         description: The heading accuracy of the player.
 *       interceptions:
 *         type: integer
 *         description: The interception ability of the player.
 *       jumping:
 *         type: integer
 *         description: The jumping ability of the player.
 *       longpassing:
 *         type: integer
 *         description: The long passing ability of the player.
 *       longshots:
 *         type: integer
 *         description: The long shot ability of the player.
 *       marking:
 *         type: integer
 *         description: The marking ability of the player.
 *       penalties:
 *         type: integer
 *         description: The penalty taking ability of the player.
 *       positioning:
 *         type: integer
 *         description: The positioning ability of the player.
 *       reactions:
 *         type: integer
 *         description: The reaction ability of the player.
 *       shortpassing:
 *         type: integer
 *         description: The short passing ability of the player.
 *       freekickaccuracy:
 *         type: integer
 *         description: The free kick accuracy of the player.
 *       shotpower:
 *         type: integer
 *         description: The shot power of the player.
 *       slidingtackle:
 *         type: integer
 *         description: The sliding tackle ability of the player.
 *       sprintspeed:
 *         type: integer
 *         description: The sprint speed of the player.
 *       standingtackle:
 *         type: integer
 *         description: The standing tackle ability of the player.
 *       stamina:
 *         type: integer
 *         description: The stamina of the player.
 *       strength:
 *         type: integer
 *         description: The strength of the player.
 *       vision:
 *         type: integer
 *         description: The vision of the player.
 *       position:
 *         type: string
 *         description: The position of the player.
 *       foot:
 *         type: string
 *         description: The preferred foot of the player.
 *       height:
 *         type: string
 *         description: The height of the player.
 *       weight:
 *         type: integer
 *         description: The weight of the player.
 *       date_of_birth:
 *         type: string
 *         format: date-time
 *         description: The date of birth of the player.
 *       rating:
 *         type: integer
 *         description: The rating of the player.
 *       weak_foot:
 *         type: integer
 *         description: The weak foot rating of the player.
 *       skills:
 *         type: integer
 *         description: The skills of the player.
 *       defensive_workrate:
 *         type: string
 *         description: The defensive work rate of the player.
 *       attack_workrate:
 *         type: string
 *         description: The attack work rate of the player.
 *       accele_rate:
 *         type: string
 *         description: The acceleration rate of the player.
 *       gender:
 *         type: string
 *         description: The gender of the player.
 *       player_styles:
 *         type: string
 *         description: The player styles of the player.
 *       player_styles_plus:
 *         type: string
 *         description: The additional player styles of the player.
 *       secondary_position:
 *         type: string
 *         description: The secondary position of the player.
 *       card:
 *        $ref: '#/components/schemas/Card'
 *       club:
 *         $ref: '#/components/schemas/Club'
 *       league:
 *          $ref: '#/components/schemas/League'
 *       nation_id:
 *         $ref: '#/components/schemas/Nation'
 */
interface PlayerDTO {
  id: number;
  date_created: string;
  fullname: string | null;
  ps_price: number | null;
  pc_price: number | null;
  overall_pace: number | null;
  overall_shooting: number | null;
  overall_passing: number | null;
  overall_dribbling: number | null;
  overall_defending: number | null;
  overall_physicality: number | null;
  gk_overall_diving: number | null;
  gk_overall_handling: number | null;
  gk_overall_kicking: number | null;
  gk_overall_reflexes: number | null;
  gk_overall_speed: number | null;
  gk_overall_positioning: number | null;
  composure: number | null;
  volleys: number | null;
  acceleration: number | null;
  aggression: number | null;
  agility: number | null;
  balance: number | null;
  ballcontrol: number | null;
  crossing: number | null;
  curve: number | null;
  dribbling: number | null;
  finishing: number | null;
  headingaccuracy: number | null;
  interceptions: number | null;
  jumping: number | null;
  longpassing: number | null;
  longshots: number | null;
  marking: number | null;
  penalties: number | null;
  positioning: number | null;
  reactions: number | null;
  shortpassing: number | null;
  freekickaccuracy: number | null;
  shotpower: number | null;
  slidingtackle: number | null;
  sprintspeed: number | null;
  standingtackle: number | null;
  stamina: number | null;
  strength: number | null;
  vision: number | null;
  position: string | null;
  foot: '5';
  height: string | null;
  weight: number | null;
  date_of_birth: string | null;
  rating: number | null;
  weak_foot: number | null;
  skills: number | null;
  defensive_workrate: string | null;
  attack_workrate: string | null;
  accele_rate: string | null;
  gender: string | null;
  player_styles: string | null;
  player_styles_plus: string | null;
  secondary_position: string | null;
  card: { id: number | null; name: string | null; img: string | null };
  club: { id: number | null; name: string | null };
  league: { id: number | null; name: string | null };
  nation: { id: number | null; name: string | null };
}

/**
 * @swagger
 * components:
 *   schemas:
 *     League:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         clubs:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Club'
 */
interface LeagueDTO {
  id: number;
  name: string;
  clubs: { id: number; name: string }[] | null;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Club:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         leagues:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/League'
 */
interface ClubDTO {
  id: number;
  name: string;
  leagues: { id: number; name: string }[] | null;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Nation:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 */
interface NationDTO {
  id: number;
  name: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         img:
 *           type: string
 */
interface CardDTO {
  id: number;
  name: string;
  img: string;
}

export const mapPlayerFields: any[] = [
  '*',
  'club_id.id',
  'club_id.name',
  'league_id.id',
  'league_id.name',
  'nation_id.id',
  'nation_id.name',
  'card_id.id',
  'card_id.full_name',
  'card_id.img',
];
export const mapPlayerResponse = (player: DPlayer): PlayerDTO => {
  const response: any = {};

  (Object.keys(player) as Array<keyof DPlayer>).forEach((key) => {
    const prop = player[key];

    if (key === 'club_id' && prop) {
      response['club'] = prop;
    } else if (key === 'nation_id' && prop) {
      response['nation'] = prop;
    } else if (key === 'league_id' && prop) {
      response['league'] = prop;
    } else if (key === 'card_id' && prop) {
      response['card'] = prop;
    } else if (key === 'date_updated') {
    } else {
      response[key] = prop;
    }
  });

  return response;
};

export const mapClubFields: any[] = ['*', 'leagues.leagues_id.id', 'leagues.leagues_id.name'];
export const mapClubResponse = ({ id, name, leagues }: DClub): ClubDTO => {
  return {
    id,
    name,
    leagues: leagues?.map((league: any) => ({ id: league.leagues_id.id, name: league.leagues_id.name })) || [],
  };
};

export const mapLeagueFields: any[] = ['*', 'clubs.clubs_id.id', 'clubs.clubs_id.name'];
export const mapLeagueResponse = ({ id, name, clubs }: DLeague): LeagueDTO => {
  return {
    id,
    name,
    clubs: clubs?.map((club: any) => ({ id: club.clubs_id.id, name: club.clubs_id.name })) || [],
  };
};

export const mapNationFields: any[] = ['*', 'leagues.leagues_id.id', 'leagues.leagues_id.name'];
export const mapNationResponse = ({ id, name }: DNation): NationDTO => {
  return {
    id,
    name,
  };
};

export const mapCardFields: any[] = ['*'];
export const mapCardResponse = ({ id, full_name, img }: DCard): CardDTO => {
  return {
    id,
    name: full_name,
    img: img,
  };
};
