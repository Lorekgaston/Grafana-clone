import { rest } from 'msw';
import { v4 } from 'uuid';

const URL = process.env.REACT_APP_FAKE_SERVER_URL;

const fakeData = [
  {
    _id: v4(),
    name: 'My Alarm',
    source: 'server 1',
    metrics: 'Memory',
    trigger: 20,
    paused: true,
    firing: false,
    normal: true,
  },
  {
    _id: v4(),
    name: 'Your Alarm',
    source: 'server 2',
    metrics: 'FS Usage',
    trigger: 80,
    paused: false,
    firing: true,
    normal: false,
  },
  {
    _id: v4(),
    name: 'Our Alarm',
    source: 'server 3',
    metrics: 'CPU Usage',
    trigger: 60,
    paused: true,
    firing: true,
    normal: false,
  },
  {
    _id: v4(),
    name: 'new Alarm',
    source: 'server 3',
    metrics: 'CPU Usage',
    trigger: 30,
    paused: true,
    firing: true,
    normal: false,
  },
];

sessionStorage.setItem(
  'alarmList',
  JSON.stringify(fakeData)
);

const handleGetItemFromStorage = (item) =>
  JSON.parse(sessionStorage.getItem(item));

const handleSetItemToStorage = (item, data) =>
  sessionStorage.setItem(item, JSON.stringify(data));

export const handlers = [
  // Get Alarms List
  rest.get(`${URL}/alarms`, (req, res, ctx) => {
    const list = handleGetItemFromStorage('alarmList');
    return res(ctx.delay(), ctx.json(list));
  }),
  // Get active/nonPaused alarms count
  rest.get(`${URL}/alarms/count`, (req, res, ctx) => {
    const list = handleGetItemFromStorage('alarmList');
    const count = list.filter((obj) => obj.paused !== true);
    return res(ctx.json(count.length));
  }),
  // update Alarm
  rest.put(`${URL}/alarms`, (req, res, ctx) => {
    const updateList = req.body;
    console.log(updateList);
    handleSetItemToStorage('alarmList', updateList);
    return res(ctx.json(`user succesfully updated`));
  }),
  // delete Alarm
  rest.delete(`${URL}/alarms`, (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    const list = handleGetItemFromStorage('alarmList');

    const filteredList = list.filter(
      (obj) => obj._id !== id
    );
    console.log(filteredList, 'delete');
    handleSetItemToStorage('alarmList', filteredList);
    return res(ctx.json(`Alarm succesfully deleted`));
  }),
];
