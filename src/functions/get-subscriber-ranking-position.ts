// função responsável por inscrever o usuário no evento.

import { redis } from '../redis/client'

interface getSubscriberRankingPositionParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: getSubscriberRankingPositionParams) {
  //   await redis.hincrby('referral:access-count', subscriberId, 1)

  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
