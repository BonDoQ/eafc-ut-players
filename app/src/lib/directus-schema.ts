export interface DSchema {
  scrap_stats: DScrapStats[];
  players: DPlayer[];
  user_metadata: DUserMetaData[];
}

export interface DPlayer {
  id: number;
  fullname?: string;
  club_id?: number;
  nation_id?: number;
  league_id?: number;
  overall_pace?: number;
  overall_shooting?: number;
  overall_passing?: number;
  overall_dribbling?: number;
  overall_defending?: number;
  overall_physicality?: number;
  position?: string;
  foot?: string;
  height?: string;
  weight?: number;
  date_of_birth?: string;
  rating?: number;
  weak_foot?: number;
  skills?: number;
  defensive_workrate?: string;
  attack_workrate?: string;
  acceleration?: number;
  aggression?: number;
  agility?: number;
  balance?: number;
  ballcontrol?: number;
  crossing?: number;
  curve?: number;
  dribbling?: number;
  finishing?: number;
  headingaccuracy?: number;
  interceptions?: number;
  jumping?: number;
  longpassing?: number;
  longshots?: number;
  marking?: number;
  penalties?: number;
  positioning?: number;
  reactions?: number;
  shortpassing?: number;
  freekickaccuracy?: number;
  shotpower?: number;
  slidingtackle?: number;
  sprintspeed?: number;
  standingtackle?: number;
  stamina?: number;
  strength?: number;
  vision?: number;
  volleys?: number;
  composure?: number;
  accele_rate?: string;
  gender?: string;
  player_styles?: string;
  player_styles_plus?: string;
  secondary_position?: string;
  gk_overall_diving?: number;
  gk_overall_handling?: number;
  gk_overall_kicking?: number;
  gk_overall_reflexes?: number;
  gk_overall_speed?: number;
  gk_overall_positioning?: number;
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
