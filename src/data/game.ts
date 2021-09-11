export type TPlayer = {
  playerId: number;
  name: string;
  lastName: string;
  position: string;
  imgUrl: string;
  master: boolean;
  observer: boolean;
};

export const playersMockData: TPlayer[] = [
  {
    playerId: 0,
    name: 'Rick',
    lastName: 'Giligan',
    position: 'lead software engineer',
    imgUrl: '',
    master: true,
    observer: false,
  },
  {
    playerId: 1,
    name: 'David',
    lastName: 'Blane',
    position: 'senior software developer',
    imgUrl:
      'https://res.cloudinary.com/demo/image/upload/c_fill,h_50,w_50/docs_uploading_example/david-blaine-1-copy_kvemca',
    master: false,
    observer: false,
  },
  {
    playerId: 2,
    name: 'Mark',
    lastName: 'Single',
    position: 'senior software developer',
    imgUrl: '',
    master: false,
    observer: false,
  },
  {
    playerId: 3,
    name: 'Fill',
    lastName: '',
    position: 'QA engineer',
    imgUrl: '',
    master: false,
    observer: false,
  },
  {
    playerId: 4,
    name: 'Dayana',
    lastName: 'Ross',
    position: 'junior software developer',
    imgUrl:
      'https://res.cloudinary.com/demo/image/upload/c_fill,h_50,w_50/docs_uploading_example/unnamed_avwnbv',
    master: false,
    observer: false,
  },
  {
    playerId: 5,
    name: 'Jane',
    lastName: 'Ring',
    position: 'software engineer',
    imgUrl: '',
    master: false,
    observer: false,
  },
  {
    playerId: 6,
    name: 'Daniel',
    lastName: 'Horn',
    position: '',
    imgUrl:
      'https://res.cloudinary.com/demo/image/upload/c_fill,h_50,w_50/docs_uploading_example/EhtAhjou_400x400_feapzl',
    master: false,
    observer: false,
  },
  {
    playerId: 7,
    name: 'Larry',
    lastName: 'King',
    position: 'junior software engineer',
    imgUrl: '',
    master: false,
    observer: false,
  },
];
