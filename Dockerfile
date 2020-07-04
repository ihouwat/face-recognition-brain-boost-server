FROM node:erbium

# Create app directory
WORKDIR /usr/src/face-recognition-brain-boost-server

#Install app dependencies
COPY ./ ./
RUN npm install

CMD ["/bin/bash"]
