export default async () => {
  const { defineConfig } = await import('vitest/config')

  return defineConfig({
    test: {
      globals: true,
    },
  })
}

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
