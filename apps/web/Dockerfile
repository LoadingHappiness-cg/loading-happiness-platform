FROM node:18-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . ./

ENV NODE_ENV=production

ARG DATABASE_URI
ARG PAYLOAD_SECRET
RUN DATABASE_URI=$DATABASE_URI PAYLOAD_SECRET=$PAYLOAD_SECRET NODE_OPTIONS=--import=tsx npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
