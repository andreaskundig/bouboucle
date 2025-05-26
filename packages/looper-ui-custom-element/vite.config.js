import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/elements/LooperUI.ts'),
      name: 'LooperUi',
      // the proper extensions will be added
      fileName: 'looperUi',
    },
  },
  plugins: [dts({
    include: ['src'],
    staticImport: true,
    insertTypesEntry: true,
    rollupTypes: true,
  })],
  // plugins: [],
})
