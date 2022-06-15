FROM node:16

EXPOSE 8080

WORKDIR /usr/src/app/

COPY . .

RUN cd frontend
RUN npm install
RUN npm run build
RUN rm -rf node_modules public src .gitignore package*.json README.md

RUN cd ../backend
RUN npm install --only=production

CMD [ "node", "index.mjs" ]