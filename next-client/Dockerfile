FROM node:26-alpine
RUN apk add --no-cache libc6-compat python3 make g++
ENV CI=true
WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm config set strict-dep-builds false && \
    pnpm install --no-frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]