import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getRanking } from '../functions/get-ranking'

// cadastrar uma subscriptions de usuários com post
export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      // um objeto schema
      // entradas de dados - body, search params, route params
      schema: {
        summary: 'Get ranking', // modificações no swagger
        tags: ['referral'],
        // response: {
        //   200: z.object({
        //     count: z.number(),
        //   }),
        // },
      },
    },
    async request => {
      await getRanking()

      return 'ok'
    }
  )
}
