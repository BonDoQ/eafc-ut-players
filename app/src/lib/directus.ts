import { authentication, createDirectus, rest, staticToken } from '@directus/sdk';

export interface DCard {
  id: number;
  name: string;
  full_name: string;
  img: string;
  slug: string;
  date_created: 'datetime';
  date_updated: 'datetime';
}

export interface DClub {
  id: number;
  name: string;
  leagues: DLeague[] | null;
  date_created: 'datetime';
  date_updated: 'datetime';
}

export interface DNation {
  id: number;
  name: string;
  date_created: 'datetime';
  date_updated: 'datetime';
}

export interface DLeague {
  id: number;
  name: string;
  clubs: DClub[] | null;
  date_created: 'datetime';
  date_updated: 'datetime';
}

export interface DPlayer {
  id: number;
  fullname: string | null;
  club_id: DClub | null;
  nation_id: DNation | null;
  league_id: DLeague | null;
  card_id: DCard | null;
  pc_price: number | null;
  ps_price: number | null;
  overall_pace: number | null;
  overall_shooting: number | null;
  overall_passing: number | null;
  overall_dribbling: number | null;
  overall_defending: number | null;
  overall_physicality: number | null;
  position: string | null;
  foot: string | null;
  height: string | null;
  weight: number | null;
  date_of_birth: string | null;
  rating: number | null;
  weak_foot: number | null;
  skills: number | null;
  defensive_workrate: string | null;
  attack_workrate: string | null;
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
  volleys: number | null;
  composure: number | null;
  accele_rate: string | null;
  gender: string | null;
  player_styles: string | null;
  player_styles_plus: string | null;
  secondary_position: string | null;
  gk_overall_diving: number | null;
  gk_overall_handling: number | null;
  gk_overall_kicking: number | null;
  gk_overall_reflexes: number | null;
  gk_overall_speed: number | null;
  gk_overall_positioning: number | null;
  date_created: 'datetime';
  date_updated: 'datetime';
}

export interface DUserMetaData {
  id: string;
  user_id: string;
  api_token: string;
  api_limit: number;
}

export interface DUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface DScrapStats {
  id: number;
  type: 'daily' | 'full';
  current_page: number;
  total_pages: number;
  date_created: 'datetime';
  date_updated: 'datetime';
}

export interface DSchema {
  clubs: DClub[];
  leagues: DLeague[];
  nations: DNation[];
  players: DPlayer[];
  scrap_stats: DScrapStats[];
  user_metadata: DUserMetaData[];
  cards: DCard[];
}

export const directus = (token: string | null = null) => {
  if (token) {
    return createDirectus<DSchema>(process.env.BACKEND_URL || '')
      .with(staticToken(token))
      .with(rest());
  } else {
    return createDirectus(process.env.BACKEND_URL || '')
      .with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
      .with(rest());
  }
};
