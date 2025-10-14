import tseslint from "typescript-eslint";

const eslintConfig = tseslint.config(
  // Arquivos para ignorar
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  // Configuração principal
  {
    extends: [
      ...tseslint.configs.recommended, // Regras TypeScript recomendadas
    ],
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      // Regras de imports
      "no-unused-vars": "off", // Desliga JS, usa TS
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // Regras de tipagem
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-expressions": "error",

      // Imports restritos (se quiser)
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../../*"],
              message:
                "Use imports absolutos com @ ao invés de relativos profundos.",
            },
          ],
        },
      ],
    },
  }
);

export default eslintConfig;
