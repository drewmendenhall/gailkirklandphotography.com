FROM node:14.1.0-alpine3.11@sha256:52c2643bc5732e4b1dabafa82b204a28e1ccd95c523cc05f26a48a61e19e5234

ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn

WORKDIR /var/www
COPY [".env.example", "package.json", "./"]
RUN npm install
COPY dist ./dist/
COPY public ./public/

EXPOSE 8000
CMD ["npm", "start"]
