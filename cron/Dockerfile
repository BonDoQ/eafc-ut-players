FROM node:21.6.0


WORKDIR /app/

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci   

COPY . /app/.


RUN npx playwright install
RUN npx playwright install-deps

RUN npm run build


CMD ["npm", "run", "cmd:daily-scrapper"]
