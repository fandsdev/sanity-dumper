FROM node:16
ENV NODE_ENV=production
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
USER nobody
CMD npm start