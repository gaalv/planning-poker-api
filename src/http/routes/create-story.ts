import { FastifyInstance } from "fastify";

export async function createStory(app: FastifyInstance) {
  app.post('/rooms/:roomId/story/new', async (request, reply) => {
    return reply.status(201)
  })
}