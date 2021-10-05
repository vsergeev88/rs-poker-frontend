export type TPlayer = {
  playerId: string;
  name: string;
  lastName: string;
  position: string;
  imgUrl: string;
  master: boolean;
  observer: boolean;
  room?: string;
};

export type TPriority = 'Low' | 'Middle' | 'Hight';

export type TPoolResults = {
  votes: Record<string, string>;
  isVotingPassed: boolean;
};

export type TIssue = {
  issueID: string;
  name: string;
  priority: TPriority;
  link: string;
  current: boolean;
  room?: string;
  poolResults?: TPoolResults;
};

export type TKickOptions = {
  targetId: string;
  initiatorId: string;
};

export type TSettings = {
  isGameStarted: boolean;
  isMasterAsPlayer: boolean;
  cardDeckNumber: number;
  isCardRound: boolean;
  isTimerNeed: boolean;
  scoreType: string;
  scoreTypeShort: string;
  roundTime: number;
  isRoundStarted?: boolean;
};

export type TImportFile = {
  name: string;
  type: string;
  size: string;
  lastModifiedDate: Date;
};
