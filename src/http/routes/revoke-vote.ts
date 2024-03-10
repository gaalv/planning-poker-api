import { prisma } from "@/lib/prisma";
import { publish } from "@/pubsub/voting-pub-sub";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function revokeVote(app: FastifyInstance) {
  app.post('/rooms/:roomId/revoke', async (request, reply) => {
    const revokeVoteParams = z.object({
      roomId: z.string()
    })

    const { roomId } = revokeVoteParams.parse(request.params)
    
    await prisma.vote.deleteMany({
      where: {
        roomId
      }
    })

    const room = await prisma.room.update({
      where: {
        id: roomId
      },
      data: {
        revealMode: false
      },
      include: {
        members: true,
        storys: true,
      }
    })

    publish(roomId, { room })

    return reply.status(201).send()
  })
}