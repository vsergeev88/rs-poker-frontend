export const IS_LOCAL_PROJECT = false;
export const IS_REMOVED_PROJECT = !IS_LOCAL_PROJECT;
export const LOCAL_SOCKET_SERVER = 'localhost:5000';
export const REMOVED_SOCKET_SERVER = 'https://pocker-server.herokuapp.com';

export const ISSUE_CARD_NAME_LENGTH = 20;
export const PLAYER_CARD_NAME_LENGTH = 15;

export const SETTING_IS_MASTER_AS_PLAYER_DEF = false;
// 0 - ACTION, 1 - FIBONACCI, 2 - COHN, 3 - POWERS_OF_TWO
export const SETTING_CARD_DECK_NUM_DEF = 0;
export const SETTING_IS_CAR_ROUND_DEF = true;
export const SETTING_IS_TIMER_NEED_DEF = true;
export const SETTING_SCORE_TYPE_DEF = 'Story point';
export const SETTING_IS_SCORE_TYPE_ERROR_DEF = false;
export const SETTING_SCORE_TYPE_SHORT_DEF = 'SP';
export const SETTING_IS_SCORE_TYPE_SHORT_ERROR_DEF = false;
export const SETTING_ROUND_TIME_DEF = 90;

export const DECK_ACTION = ['?', 'Inf', 'Unknown'];
export const DECK_FIBONACCI = [
  '0',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '21',
  '34',
  '55',
  '89',
];
export const DECK_COHN = ['0', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
export const DECK_POWERS_OF_TWO = ['0', '1', '2', '4', '8', '16', '32', '64', '128'];
export const CARD_DECKS = [DECK_ACTION, DECK_FIBONACCI, DECK_COHN, DECK_POWERS_OF_TWO];
export const INITAL_DECK = CARD_DECKS[SETTING_CARD_DECK_NUM_DEF];

export const MAX_VALUE_CUSTOM_CARD = 999;
