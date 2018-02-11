FROM nginx

# Node
RUN apt-get update && apt-get install -y curl jekyll git gnupg
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

RUN mkdir -p /home/tmp
WORKDIR /home/tmp

# keep node_modules cache if package.json is untouched
COPY package.json /home/tmp
RUN npm install

COPY . /home/tmp
RUN npm run build

RUN cp -R /home/tmp/public/* /usr/share/nginx/html/
