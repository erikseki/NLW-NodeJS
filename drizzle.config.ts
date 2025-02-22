import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/drizzle/schema/*', // caminho da pasta da tabela
  out: './src/drizzle/migrations', // arquivos sql gerados pelo drizzle - arquivos resaponsáveis pela criação das tabelas no banco de dados (migrations)
  dialect: 'postgresql', // dialeto será o postgresql
  dbCredentials: {
    // url do banco de dados
    url: env.POSTGRES_URL,
  },
} satisfies Config
