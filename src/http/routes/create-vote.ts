import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function createVote(app: FastifyInstance) {
  app.post('/rooms/:roomId/vote', async (request, reply) => {
    const createVoteParams = z.object({
      roomId: z.string()
    })

    const createVoteBody = z.object({
      userId: z.string(),
      value: z.string(),
    })

    const { roomId } = createVoteParams.parse(request.params)

    const { userId, value } = createVoteBody.parse(request.body)

    const userAlreadyVoted = await prisma.vote.findFirst({
      where: {
        userId,
        roomId
      }
    })

    if (userAlreadyVoted) {
      await prisma.vote.update({
        where: {
          id: userAlreadyVoted.id
        },
        data: {
          userId,
          value,
          roomId
        }
      })

      return reply.status(201).send()
    }

    await prisma.vote.create({
      data: {
        userId,
        value,
        roomId
      }
    })

    return reply.status(201).send()
  })
}