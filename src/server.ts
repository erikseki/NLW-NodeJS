import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
// definir qual url o meu front end vai ter acesso ao backend, é possível deixar o origin como true ou sem especificação do origin porém em produção, precisa colocar a url
app.register(fastifyCors, {
  // origin: 'http://localhost:3000',
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// métodos GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS

// adicionando uma rota /hello para retornar o 'hello world'
// app.get('/hello', () =>{
//     return 'hello world';
// })

app.register(subscribeToEventRoute)

// para rodar no terminal na porta 3333
app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server Running !!')
})
