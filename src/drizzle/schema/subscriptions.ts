// armazenar as incrições dos usuários dentro do sistema.

import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  email: text('email').notNull().unique(),
  createAt: timestamp('created_at').notNull().defaultNow(),
})
