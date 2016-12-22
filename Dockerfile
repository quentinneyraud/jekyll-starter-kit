FROM nginx

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs build-essential
RUN gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 \
    && curl -sSL https://get.rvm.io | bash -s stable --ruby --gems=jekyll,bundler
RUN bundle install --path vendor

RUN mkdir -p /home/tmp
WORKDIR /home/tmp

# keep node_modules cache if package.json is untouched
COPY package.json /home/tmp
RUN npm install

COPY . /home/tmp
RUN npm run deploy:prod

RUN cp -R /home/tmp/dist/* /usr/share/nginx/html/
