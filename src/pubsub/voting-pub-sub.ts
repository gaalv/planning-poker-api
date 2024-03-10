import { Room } from "@prisma/client";

type Message = { room: Room | null };
type Subscriber = (message: Message) => void;

const channels: Record<string, Subscriber[]> = {};

export function subscribe(roomId: string, subscriber: Subscriber) {
  if (!channels[roomId]) {
    channels[roomId] = [];
  }

  channels[roomId].push(subscriber);
}

export function publish(roomId: string, message: Message) {
  if (!channels[roomId]) {
    return;
  }

  for (const subscriber of channels[roomId]) {
    subscriber(message);
  }
}
