// eslint.config.js
import js from '@eslint/js'

export default [
  { ignores: ['dist', 'build', 'node_modules'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: { ecmaVersion: 2023, sourceType: 'module' },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
]
