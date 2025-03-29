FROM node:lts-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

FROM node:lts-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm install -g pnpm
RUN pnpm build

FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nearsoft
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nearsoft /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nearsoft /app/.next/static ./.next/static
USER nextjs
ENV PORT 3000
EXPOSE 3000
CMD ["node", "server.js"]
