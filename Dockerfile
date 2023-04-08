FROM node:14-alpine

# ARG NODE_ENV

WORKDIR /usr/api

COPY ./ ./

# npm ci - like npm install without devDependecies
RUN npm ci

# ENV NODE_ENV="$NODE_ENV"
EXPOSE 8080

ENTRYPOINT ["npm"]
CMD ["start"]