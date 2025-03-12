import type { FastifyReply, FastifyRequest } from 'fastify'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export async function subscribeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, email, referrer } = request.body as {
    name: string
    email: string
    referrer?: string | null
  }

  const { subscriberId } = await subscribeToEvent({
    name,
    email,
    referrerId: referrer,
  })

  return reply.status(201).send({ subscriberId })
}
