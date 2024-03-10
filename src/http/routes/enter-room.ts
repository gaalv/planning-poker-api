import { prisma } from "@/lib/prisma";
import { publish } from "@/pubsub/voting-pub-sub";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function enterRoom(app: FastifyInstance) {
  app.post('/rooms/:roomId/enter', async (request, reply) => {
    const enterRoomParams = z.object({
      roomId: z.string()
    })

    const enterRoomBody = z.object({
      name: z.string(),
      email: z.string(),
    })

    const { roomId } = enterRoomParams.parse(request.params)
    
    const { name, email } = enterRoomBody.parse(request.body)

    const userAlreadyRegistered = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    if (userAlreadyRegistered) {
      const room = await prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          members: {
            connect: userAlreadyRegistered
          }
        },
        include: {
          members: true,
          storys: true
        }
      })

      publish(roomId, { room })

      return reply.status(200).send(userAlreadyRegistered)
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      }
    })

    const room = await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        members: {
          connect: user
        }
      },
      include: {
        members: true,
        storys: true,
        votes: true
      }
    })

    publish(roomId, { room })

    return reply.status(200).send(user)
  })
}