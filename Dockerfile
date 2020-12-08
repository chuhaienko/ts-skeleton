FROM node:14-alpine as build
WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install
COPY ./src ./src
RUN yarn build
RUN yarn install --prod


FROM node:14-alpine AS release
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
RUN ls -la /app
RUN ls -la /app/dist

USER node

CMD [ "node", "dist/index.js" ]
