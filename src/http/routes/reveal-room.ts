import { prisma } from "@/lib/prisma";
import { publish } from "@/pubsub/voting-pub-sub";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function revealRoom(app: FastifyInstance) {
  app.get('/rooms/:roomId/reveal', async (request, reply) => {
    const revealRoomParams = z.object({
      roomId: z.string()
    })

    const { roomId } = revealRoomParams.parse(request.params)

    const room = await prisma.room.findUnique({
      where: {
        id: roomId
      },
      include: {
        members: true,
        storys: true,
        votes: true
      }
    })

    if (!room?.votes || !room?.members) {
      return reply.status(400).send({
        message: 'There are no members or no votes'
      })
    }

    if (room?.votes?.length < room?.members?.length) {
      return reply.status(400).send({
        message: 'Not every body has voted'
      })
    }

    const updatedRoom = await prisma.room.update({
      where: {
        id: room.id
      },
      data: {
        revealMode: true,
      },
      include: {
        members: true,
        storys: true,
        votes: true
      }
    })

    publish(roomId, { room: updatedRoom })

    return reply.status(201).send()
  })
}