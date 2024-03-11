import fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";
import cors from '@fastify/cors'
import { createRoom } from "./routes/create-room";
import { getRoom } from "./routes/get-room";
import { registerInRoom } from "./ws/subscribe-in-room";
import { createStory } from "./routes/create-story";
import { createVote } from "./routes/create-vote";
import { revealRoom } from "./routes/reveal-room";
import { enterRoom } from "./routes/enter-room";
import { revokeVote } from "./routes/revoke-vote";
import { healthCheck } from "./routes/healthcheck";

const app = fastify();

app.register(cors, {
  origin: '*'
})

app.register(healthCheck)
app.register(fastifyWebsocket);
app.register(createRoom)
app.register(getRoom)
app.register(createStory)
app.register(createVote)
app.register(registerInRoom)
app.register(revealRoom)
app.register(enterRoom)
app.register(revokeVote)

app.listen({ port: 8080 }).then(() => {
  console.log("🚀🚀 HTTP server is running!");
});