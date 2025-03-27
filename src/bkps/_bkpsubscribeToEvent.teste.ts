// // subscribe-to-event.test.ts
// import { describe, expect, it, vi } from 'vitest'
// import { db } from '../src/drizzle/client' // Banco de dados
// import { subscribeToEvent } from '../src/functions/subscribe-to-event' // Função principal
// import { redis } from '../src/redis/client' // Redis client

// // Mock do Redis
// vi.mock('../src/redis/client', () => ({
//   redis: {
//     zincrby: vi.fn().mockResolvedValue(1), // Mockando a resposta como sucesso
//   },
// }))

// // Mock do db
// vi.mock('../src/drizzle/client', () => ({
//   db: {
//     select: vi.fn().mockReturnValue({
//       from: vi.fn().mockReturnThis(), // Mockando o método "from"
//       where: vi.fn().mockReturnThis(), // Mockando o método "where"
//       select: vi.fn().mockReturnValue([{ id: '1' }]), // Mockando o retorno do "select"
//     }),
//     insert: vi.fn().mockReturnValue({
//       values: vi.fn().mockReturnValue({
//         returning: vi.fn().mockReturnValue([{ id: '1' }]), // Mockando inserção com retorno de ID
//       }),
//     }),
//   },
// }))

// describe('subscribeToEvent', () => {
//   it('deve retornar o ID do assinante se o e-mail já existir', async () => {
//     const result = await subscribeToEvent({
//       name: 'Erik',
//       email: 'erik@email.com',
//     })

//     expect(result).toEqual({ subscriberId: '1' }) // Espera o ID '1' que vem do mock
//     expect(db.select).toHaveBeenCalled() // Verifica se a função select foi chamada
//   })

//   it('deve criar um novo assinante se o e-mail não existir', async () => {
//     // Alterando o mock para simular que não existe o e-mail
//     // vi.spyOn(db, 'select').mockResolvedValueOnce([])

//     vi.spyOn(db, 'select').mockImplementation(
//       () =>
//         ({
//           from: () => ({
//             where: () => Promise.resolve([]),
//           }),

//           // biome-ignore lint/suspicious/noExplicitAny: <explanation>
//         }) as any
//     )

//     // expect(result).toEqual({ subscriberId: '2' }) // Espera o ID '2' que vem do mock de insert
//     // expect(db.insert).toHaveBeenCalled() // Verifica se a função insert foi chamada
//   })

//   it('deve incrementar o ranking no Redis se referrerId for passado', async () => {
//     const result = await subscribeToEvent({
//       name: 'Referenciado',
//       email: 'referenciado@email.com',
//       referrerId: '123',
//     })

//     expect(redis.zincrby).toHaveBeenCalledWith('referral:ranking', 1, '123') // Verifica se o Redis foi chamado para incrementar o ranking
//   })
// })
