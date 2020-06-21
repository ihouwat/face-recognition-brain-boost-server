FROM node:erbium

WORKDIR /usr/src/face-recognition-brain-boost-server

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
