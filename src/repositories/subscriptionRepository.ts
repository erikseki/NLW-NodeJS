// import { eq } from 'drizzle-orm'
// import { db } from '../drizzle/client'
// import { subscriptions } from '../drizzle/schema/subscriptions'

// // biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
// export class SubscriptionRepository {
//   static async findByEmail(email: string) {
//     return await db
//       .select()
//       .from(subscriptions)
//       .where(eq(subscriptions.email, email))
//   }

//   static async createSubscriber(name: string, email: string) {
//     return await db.insert(subscriptions).values({ name, email }).returning()
//   }
// }

// //Agora temos um repositório isolado que pode ser otimizado independentemente da regra de negócio.
