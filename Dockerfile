FROM node:22-bookworm-slim AS base

WORKDIR /app

COPY package.json package-lock.json ./

FROM base AS development

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM base AS production

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]