import dotenv from 'dotenv'
import { defineConfig } from 'vitest/config'

dotenv.config({ path: '.env.test' })

export default defineConfig({
  test: {
    globals: true,
  },
})

// export default defineConfig({
//   test: {
//     globals: true,
//     environment: 'node',
//     coverage: {
//       provider: 'v8',
//       reporter: ['text', 'json', 'html'],
//     },
//   },
// })
