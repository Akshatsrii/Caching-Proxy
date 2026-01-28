FROM node:20

WORKDIR /app

COPY backend/package.json .
RUN npm install

COPY backend .

EXPOSE 3000

CMD ["node", "cli.js", "--port", "3000", "--origin", "http://dummyjson.com"]
