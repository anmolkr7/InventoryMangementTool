FROM node:20
ARG PORT=5000
ENV PORT=${PORT}
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
EXPOSE ${PORT}
CMD [ "node", "server.js" ]
