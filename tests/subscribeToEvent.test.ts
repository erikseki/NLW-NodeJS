import { describe, expect, it, vi } from 'vitest'

vi.mock('../src/drizzle/client', () => ({
  db: {
    select: vi.fn().mockResolvedValue([]),
    insert: vi.fn().mockResolvedValue([{ id: 'fake-subscriber-id' }]),
  },
}))
