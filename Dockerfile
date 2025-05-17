FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,id=npm,target=/root/.npm npm install --frozen-lockfile
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=build /app/client/dist ./client/dist
COPY server ./server
COPY tsconfig.json ./
RUN --mount=type=cache,id=npm,target=/root/.npm npm install --frozen-lockfile
EXPOSE 3000
CMD ["npm", "run", "start:server"]