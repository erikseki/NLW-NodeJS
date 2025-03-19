import { describe, expect, it, vi } from 'vitest'
import { subscribeToEvent } from '../src/functions/subscribe-to-event'

vi.mock('../src/drizzle/client', () => ({
  db: {
    select: vi.fn().mockResolvedValue([]),
    insert: vi.fn().mockResolvedValue([{ id: 'fake-subscriber-id' }]),
  },
}))

describe('should create a new subscriber and return the ID', async () => {
  const result = await subscribeToEvent({
    name: 'usuario teste',
    email: 'usuarioteste@example.com',
  })

  expect(result).toEqual({ subscriberId: 'fake-subscriber-id' })
})
