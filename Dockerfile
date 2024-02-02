# FROM node:18-alpine

# ENV NODE_ENV=production

# RUN mkdir -p /server
# WORKDIR /server
# COPY package.json /server
# # RUN npm set-script prepare '' && npm install --production --force
# RUN npm install -g @nrwl/nx
# RUN npm install --force
# COPY . ./
# ENV NODE_OPTIONS="--max_old_space_size=8192"
# RUN nx release publish
# RUN npm run build
# EXPOSE 3000
# CMD npm start

FROM node:alpine
# create & set working directory
RUN mkdir -p /server
WORKDIR /server
# copy source files
COPY . /server
# install dependencies
# RUN npm cache clean --force 
RUN npm install -g @nrwl/nx
# RUN npm install --legacy-peer-deps
RUN npm ci
# start app
ENV NODE_OPTIONS="--max_old_space_size=8192"
# RUN npx nx build authoring-web
RUN npx nx affected:build --base=origin/$GITHUB_BASE_REF --head=$GITHUB_HEAD_REF
EXPOSE 3000
CMD npm run start
# CMD npm run deploy:react-test
# CMD serve dist/apps/react-test -p 3000
