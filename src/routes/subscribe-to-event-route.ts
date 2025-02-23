import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'
// cadastrar uma subscriptions de usuários com post
export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      // um objeto schema
      // entradas de dados - body, search params, route params
      schema: {
        summary: 'subscribe someone to the event', // modificações no swagger
        tags: ['subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      // aqui seria a criação da inscrição no banco de dados
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
      })

      return reply.status(201).send({
        subscriberId,
      })
      // ao invés do 200, utilizar o 201 sucesso e o recurso foi criado
    }
  )
}
