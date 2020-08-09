# specifing the base image
FROM node:alpine

# installing dependancies to the docker container

COPY ./ ./
RUN npm install

CMD ["npm","start"]

EXPOSE 4444:4444
