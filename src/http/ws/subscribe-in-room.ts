import { subscribe } from "@/pubsub/voting-pub-sub";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function registerInRoom(app: FastifyInstance) {
  app.get('/rooms/:roomId/register', { websocket: true }, async (connection, request) => {
    const registerInRoomParams = z.object({
      roomId: z.string()
    })

    const { roomId } = registerInRoomParams.parse(request.params)

    subscribe(roomId, (message) => {
      connection.socket.send(JSON.stringify(message));
    });
  })
}