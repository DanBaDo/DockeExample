FROM node:16

EXPOSE 8080

WORKDIR /usr/src/app/

COPY . .

WORKDIR /usr/src/app/frontend
RUN npm install
RUN npm run build
RUN mv build ..

WORKDIR /usr/src/app/
RUN rm frontend -rf

WORKDIR /usr/src/app/backend
RUN npm install --omit=dev
ENTRYPOINT [ "npm", "start" ]