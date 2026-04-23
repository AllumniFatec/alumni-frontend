# ================================
# Stage 1: Dependências
# ================================
FROM node:20-alpine AS deps
WORKDIR /app

# Instala libc para compatibilidade com algumas libs nativas
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# ================================
# Stage 2: Build
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variáveis de build (substituídas em tempo de build pelo Docker/CI)
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_APP_NAME="Alumni Fatec Sorocaba"
ARG NEXT_PUBLIC_APP_VERSION="1.0.0"

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_APP_VERSION=$NEXT_PUBLIC_APP_VERSION
ENV NODE_ENV=production

# Desativa telemetria do Next.js
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ================================
# Stage 3: Runner (imagem final enxuta)
# ================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cria usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copia arquivos públicos e build standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]