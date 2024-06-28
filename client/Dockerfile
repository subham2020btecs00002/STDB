FROM node:21.5.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start", "test"]
 # Run tests when the container starts
