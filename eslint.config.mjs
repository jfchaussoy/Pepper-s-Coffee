import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn', // Avertissement sur les variables inutilisées
      'no-console': 'off', // Autorise l'utilisation de console.log
    },
    ignores: [
      'node_modules/', // Ignorer les dépendances téléchargées
      'dist/', // Ignorer les fichiers de build
    ],
  },
  pluginJs.configs.recommended,
]
