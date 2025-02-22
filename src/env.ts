import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(), // url de conexão com o banco de dados
  REDIS_URL: z.string().url(), // url de conexão com o banco de dados
})

export const env = envSchema.parse(process.env)
