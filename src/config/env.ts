/**
 * Configuração de ambiente - Client Side Only
 *
 * Configuração simples para aplicação frontend que consome APIs externas
 */

// ===== CONFIGURAÇÃO PRINCIPAL =====
export const config = {
  // 🌐 API Externa
  api: {
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://jsonplaceholder.typicode.com",
    timeout: 10000, // 10 segundos
  },

  // 📱 Aplicação
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Alumni Fatec",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    environment: process.env.NODE_ENV || "development",
  },
} as const;

// ===== UTILITÁRIOS =====
export const isDevelopment = config.app.environment === "development";
export const isProduction = config.app.environment === "production";

// ===== VALIDAÇÃO SIMPLES =====
export const validateConfig = (): void => {
  if (!config.api.baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL é obrigatória");
  }

  if (!config.app.name) {
    console.warn("NEXT_PUBLIC_APP_NAME não definida, usando padrão");
  }
};

// ===== LOG EM DESENVOLVIMENTO =====
if (isDevelopment && typeof window !== "undefined") {
  console.log("🚀 Alumni Config:", {
    apiUrl: config.api.baseUrl,
    appName: config.app.name,
    version: config.app.version,
    env: config.app.environment,
  });
}

// ===== EXPORTS =====
export default config;
