import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

// cadastrar uma subscriptions de usuários com post
export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        // um objeto schema
        // entradas de dados - body, search params, route params
        schema: {
          summary: 'Get subscriber ranking position', // modificações no swagger
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })

        return { position }
      }
    )
  }
