FROM nginx

# Node
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs build-essential

# Ruby
WORKDIR /tmp
RUN curl -O http://ftp.ruby-lang.org/pub/ruby/2.1/ruby-2.1.5.tar.gz
RUN tar -xvzf ruby-2.1.5.tar.gz
WORKDIR ruby-2.1.5/
RUN ./configure --prefix=/usr/local
RUN make
RUN make install

# Jekyll
RUN gem install jekyll --no-ri --no-rdoc

#RUN gem install jekyll bundler --no-ri --no-rdoc
#RUN bundle install --path vendor

RUN mkdir -p /home/tmp
WORKDIR /home/tmp

# keep node_modules cache if package.json is untouched
COPY package.json /home/tmp
RUN npm install

COPY . /home/tmp
RUN npm run build

RUN cp -R /home/tmp/public/* /usr/share/nginx/html/
