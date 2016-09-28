FROM node:slim

ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn

WORKDIR /var/www
COPY [".env.example", "package.json", "./"]
RUN npm install
COPY dist ./dist/
COPY public ./public/

EXPOSE 8000
CMD ["npm", "start"]
