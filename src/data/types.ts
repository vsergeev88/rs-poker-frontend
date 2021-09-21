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

export type TIssue = {
  issueID: string;
  name: string;
  priority: TPriority;
  link: string;
  current: boolean;
  room?: string;
};

export type TKickOptions = {
  targetId: string;
  initiatorId: string;
};