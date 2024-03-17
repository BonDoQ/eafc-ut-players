import { DClub, DLeague, DNation, DPlayer } from './directus';

interface PlayerDTO {
  id: number;
  date_created: string;
  fullname: string | null;
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
  club: { id: number | null; name: string | null };
  league_id: { id: number | null; name: string | null };
  nation_id: { id: number | null; name: string | null };
}

interface LeagueDTO {
  id: number | null;
  date_created: string | null;
  name: string | null;
  clubs: { id: number; name: string }[] | null;
}

interface ClubDTO {
  id: number | null;
  date_created: string | null;
  name: string | null;
  leagues: { id: number; name: string }[] | null;
}

interface NationDTO {
  id: number | null;
  date_created: string | null;
  name: string | null;
}

export const mapPlayerFields: any[] = [
  '*',
  'club_id.id',
  'club_id.name',
  'league_id.id',
  'league_id.name',
  'nation_id.id',
  'nation_id.name',
];
export const mapPlayerResponse = (player: DPlayer): PlayerDTO => {
  const response: any = {};

  (Object.keys(player) as Array<keyof DPlayer>).forEach((key) => {
    if (key === 'club_id' && player[key]) {
      response['club'] = player[key];
    } else if (key === 'nation_id' && player[key]) {
      response['nation'] = player[key];
    } else if (key === 'league_id' && player[key]) {
      response['league'] = player[key];
    } else if (key === 'date_updated') {
    } else {
      response[key] = player[key];
    }
  });

  return response;
};

export const mapClubFields: any[] = ['*', 'leagues.leagues_id.id', 'leagues.leagues_id.name'];
export const mapClubResponse = ({ id, name, leagues, date_created }: DClub): ClubDTO => {
  return {
    id,
    name,
    leagues: leagues?.map((league: any) => ({ id: league.leagues_id.id, name: league.leagues_id.name })) || [],
    date_created,
  };
};

export const mapLeagueFields: any[] = ['*', 'clubs.clubs_id.id', 'clubs.clubs_id.name'];
export const mapLeagueResponse = ({ id, name, clubs, date_created }: DLeague): LeagueDTO => {
  return {
    id,
    name,
    clubs: clubs?.map((club: any) => ({ id: club.clubs_id.id, name: club.clubs_id.name })) || [],
    date_created,
  };
};

export const mapNationFields: any[] = ['*', 'leagues.leagues_id.id', 'leagues.leagues_id.name'];
export const mapNationResponse = ({ id, name, date_created }: DNation): NationDTO => {
  return {
    id,
    date_created,
    name,
  };
};
