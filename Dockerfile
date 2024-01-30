FROM node:18-alpine

ENV NODE_ENV=production

RUN mkdir -p /server
WORKDIR /server
COPY package.json /server
# RUN npm set-script prepare '' && npm install --production --force
RUN npm install -g @nrwl/nx
RUN npm install --force
COPY . ./
ENV NODE_OPTIONS="--max_old_space_size=8192"
RUN nx release publish
# RUN npm run build
# EXPOSE 3000
# CMD npm start
