# Build stage
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM node:18
WORKDIR /app
COPY --from=build /app/dist /app
COPY package.json package-lock.json ./
RUN npm install --production
CMD ["node", "dist/index.js"]
