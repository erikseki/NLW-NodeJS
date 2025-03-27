# NLW-NodeJS 🚀

**[Link do Notion para visualizar os diagramas/fluxogramas](smart-ground-475.notion.site/Mapa-Mental-NLW-1b1a3bcdd44380aa8938c814ceb7fbcd?pvs=74)**


Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.


### 📋 Estruturação

Principais conceitos utilizados nesse projeto

```
Lógica de Programação
NojeJs
Typescript
SRP - Single Responsibility Principle
Métodos HTTP
Camada de serviços/Microserviços 
Validação de dados com ZOD
ORM 
REST API
TSUP Convert 
```

## 🗂️ Melhorando a Organização do Código
`
Utilizando o Services, Controller e Repository ( Repository pendente ) para realizar a separação das funções, rota e requisição do banco de dados.
`


## ⚙️ Executando os testes unitários e de integração

<!-- Explicar como executar os testes automatizados para este sistema. -->

### Teste para *subscribeToEvent*
![Testes](https://img.shields.io/badge/testes-passando-brightgreen)

Este teste unitário foi incluído no projeto para garantir a confiabilidade e a correta funcionalidade da função subscribeToEvent, que é responsável pelo cadastro de assinantes em um evento. **Essa função interage com um banco de dados (Drizzle ORM)**

- Usuários existentes sejam identificados corretamente.
- Novos assinantes sejam inseridos corretamente no banco de dados.
- O ranking de indicação seja atualizado corretamente quando um `referrerId` for fornecido.




| Cenário                     | Resultado Esperado |
|-----------------------------|--------------------|
| E-mail já cadastrado        | Retorna ID existente |
| Novo e-mail                 | Cria novo assinante |
| Com `referrerId` informado | Atualiza ranking |

</br>

#### Bibliotecas Utilizadas

O teste utiliza:

- `vitest`: framework de testes para JavaScript e TypeScript.
- `vi.mock`: para mockar dependências externas (banco de dados e Redis).
- `expect`: para validar os resultados esperados.

</br>

#### Mocks Criados

##### 1. Mock do Banco de Dados (Drizzle ORM)

```javascript
vi.mock('../src/drizzle/client', () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnThis(), // Mockando o método "from"
      where: vi.fn().mockReturnThis(), // Mockando o método "where"
      select: vi.fn().mockReturnValue([{ id: '1' }]), // Mockando o retorno do "select"
    }),
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockReturnValue([{ id: '1' }]), // Mockando inserção com retorno de ID
      }),
    }),
  },
}))
```
Esse mock simula as operações do Drizzle ORM:

- `select.from.where` retorna um assinante existente (para testes de e-mails já cadastrados).
- `insert.values.returning` simula a inserção de um novo assinante no banco.

</br>

##### 2. Mock do Redis

```javascript
vi.mock('../src/redis/client', () => ({
  redis: {
    zincrby: vi.fn().mockResolvedValue(1), // Mockando a resposta como sucesso
  },
}))
```
Esse mock evita chamadas reais ao Redis, substituindo a função zincrby por uma versão mockada.
</br>

#### Casos de Teste Implementados

##### 1. Retorno do ID do assinante se o e-mail já existir

```javascript
it('deve criar um novo assinante se o e-mail não existir', async () => {
  db.select.mockImplementation(() => ({
    from: vi.fn(() => ({
      where: vi.fn(() => []), // Simulando usuário não encontrado
    })),
  }))

  const result = await subscribeToEvent({
    name: 'Novo Usuário',
    email: 'novo@email.com',
  })

  expect(result).toEqual({ subscriberId: '2' }) // Novo ID criado
  expect(db.insert).toHaveBeenCalled()
})
```

Esse teste garante que, se um e-mail já estiver cadastrado, o ID do assinante existente será retornado sem criar um novo registro ✅

</br>

##### 2. Cria um novo assinante se o e-mail não existir

```javascript
it('deve criar um novo assinante se o e-mail não existir', async () => {
  db.select.mockImplementation(() => ({
    from: vi.fn(() => ({
      where: vi.fn(() => []), // Simulando usuário não encontrado
    })),
  }))

  const result = await subscribeToEvent({
    name: 'Novo Usuário',
    email: 'novo@email.com',
  })

  expect(result).toEqual({ subscriberId: '2' }) // Novo ID criado
  expect(db.insert).toHaveBeenCalled()
})
```
Esse teste garante que, quando um e-mail novo é passado, um novo assinante é corretamente inserido no banco de dados ✅

</br>

##### 3. Atualiza o ranking no Redis se houver um referrerId

```javascript
it('deve incrementar o ranking no Redis se referrerId for passado', async () => {
  await subscribeToEvent({
    name: 'Referenciado',
    email: 'referenciado@email.com',
    referrerId: '123',
  })

  expect(redis.zincrby).toHaveBeenCalledWith('referral:ranking', 1, '123')
})
```
Esse teste garante que, se um `referrerId` for fornecido, o ranking de indicação será corretamente atualizado no Redis ✅

</br>

<!--



### 🔩 Analise os testes de ponta a ponta

Explique que eles verificam esses testes e porquê.

```
Dar exemplos
```

### ⌨️ E testes de estilo de codificação

Explique que eles verificam esses testes e porquê.

```
Dar exemplos
```


## 📦 Implantação

Adicione notas adicionais sobre como implantar isso em um sistema ativo

## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - O framework web usado
* [Maven](https://maven.apache.org/) - Gerente de Dependência
* [ROME](https://rometools.github.io/rome/) - Usada para gerar RSS

## 🖇️ Colaborando

Por favor, leia o [COLABORACAO.md](https://gist.github.com/usuario/linkParaInfoSobreContribuicoes) para obter detalhes sobre o nosso código de conduta e o processo para nos enviar pedidos de solicitação.

## 📌 Versão

Nós usamos [SemVer](http://semver.org/) para controle de versão. Para as versões disponíveis, observe as [tags neste repositório](https://github.com/suas/tags/do/projeto). 

## ✒️ Autores

Mencione todos aqueles que ajudaram a levantar o projeto desde o seu início

* **Um desenvolvedor** - *Trabalho Inicial* - [umdesenvolvedor](https://github.com/linkParaPerfil)
* **Fulano De Tal** - *Documentação* - [fulanodetal](https://github.com/linkParaPerfil)

Você também pode ver a lista de todos os [colaboradores](https://github.com/usuario/projeto/colaboradores) que participaram deste projeto.

## 📄 Licença

Este projeto está sob a licença (sua licença) - veja o arquivo [LICENSE.md](https://github.com/usuario/projeto/licenca) para detalhes.


### 🔧 Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

Diga como essa etapa será:

```
Dar exemplos
```
-->

## ⚙️ Readme em Processo

</br>

## 🎁 Expressões de gratidão

* Conte a outras pessoas sobre este projeto 📢;
* Convide alguém da equipe para uma cerveja 🍺;
* Um agradecimento publicamente 🫂;
* etc.
