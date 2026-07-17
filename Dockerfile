FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_COFFEE_PUBLIC_URL=http://localhost:4001
ENV VITE_COFFEE_PUBLIC_URL=$VITE_COFFEE_PUBLIC_URL

RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=build /app/.output ./.output

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]