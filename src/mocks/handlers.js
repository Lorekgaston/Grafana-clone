import { rest } from 'msw';

const URL = process.env.REACT_APP_FAKE_SERVER_URL;

const fakeData = [
  {
    _id: 1,
    name: 'My Alarm',
    source: 'server 1',
    metrics: 'Memory',
    trigger: 20,
    paused: true,
    firing: false,
    normal: true,
  },
  {
    _id: 2,
    name: 'Your Alarm',
    source: 'server 2',
    metrics: 'FS Usage',
    trigger: 80,
    paused: false,
    firing: true,
    normal: false,
  },
  {
    _id: 3,
    name: 'Our Alarm',
    source: 'server 3',
    metrics: 'CPU Usage',
    trigger: 60,
    paused: true,
    firing: true,
    normal: false,
  },
  {
    _id: 4,
    name: 'new Alarm',
    source: 'server 3',
    metrics: 'CPU Usage',
    trigger: 30,
    paused: true,
    firing: true,
    normal: false,
  },
];

export const handlers = [];
