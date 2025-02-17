import {fastify} from 'fastify';
import {fastifyCors} from '@fastify/cors'
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod'
import {z} from 'zod'

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
// definir qual url o meu front end vai ter acesso ao backend, é possível deixar o origin como true ou sem especificação do origin porém em produção, precisa colocar a url
app.register(fastifyCors, {
    // origin: 'http://localhost:3000',
})

// métodos GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS

// adicionando uma rota /hello para retornar o 'hello world'
// app.get('/hello', () =>{
//     return 'hello world';
// })

// cadastrar uma subscriptions de usuários com post
app.post('/subscriptions', {
    // um objeto schema 
    // entradas de dados - body, search params, route params
    schema: {
        body: z.object({
            name: z.string(),
            email: z.string().email(),
        }),
    }
}, (request, reply) =>{
    const { name, email } = request.body


    // aqui seria a criação da inscrição no banco de dados/ como não integramos, não será adicionado.

    return reply.status(201).send({
        name,
        email,
    })
    // ao invés do 200, utilizar o 201 sucesso e o recurso foi criado 
})

// para rodar no terminal na porta 3333 
app.listen({ port: 3333}).then(() => {
    console.log('HTTP server Running !!')
})