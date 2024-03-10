import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function getRoom(app: FastifyInstance) {
  app.get('/rooms/:id', async (request, reply) => {
    const getRoomParams = z.object({
      id: z.string()
    })

    const { id } = getRoomParams.parse(request.params)

    const room = await prisma.room.findUnique({
      where: {
        id
      },
      include: {
        members: true,
        storys: true,
        votes: true
      }
    })

    if (!room) {
      return reply.status(400).send({ message: 'Room not exists or expired' })
    }

    return reply.status(200).send(room)
  })
}