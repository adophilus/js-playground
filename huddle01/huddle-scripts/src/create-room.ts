import { API } from '@huddle01/server-sdk/api';

const api = new API({
  apiKey: process.env.HUDDLE01_API_KEY!,
});

const newRoom = await api.createRoom({
  roomLocked: true,
  metadata: JSON.stringify({
    'title': 'Huddle01 Meeting',
  })
});

console.log(newRoom);
