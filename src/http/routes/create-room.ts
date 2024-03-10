import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function createRoom(app: FastifyInstance) {
  app.post('/rooms', async (request, reply) => {
    const createRoomBody = z.object({
      roomName: z.string(),
      email: z.string(),
    })

    const { roomName, email } = createRoomBody.parse(request.body)

    const room = await prisma.room.create({
      data: {
        title: roomName,
        author: email,
      }
    })

    return reply.status(200).send(room)
  })
}