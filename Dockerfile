# Install dependencies and build the app
FROM node:18-alpine AS builder

WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Use a lean image for running the app
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy the necessary build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Use node user
USER node
EXPOSE 3000

CMD ["node", "server.js"]
