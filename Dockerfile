FROM nginx

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs build-essential ruby-full
RUN gem install jekyll bundler --no-ri --no-rdoc
RUN bundle install --path vendor

RUN mkdir -p /home/tmp
WORKDIR /home/tmp

# keep node_modules cache if package.json is untouched
COPY package.json /home/tmp
RUN npm install

COPY . /home/tmp
RUN npm run deploy:prod

RUN cp -R /home/tmp/dist/* /usr/share/nginx/html/
