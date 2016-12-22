FROM nginx

# Node
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs build-essential

# Ruby
RUN apt-get -y install ruby ruby-dev rubygems git gcc make \
	&& git clone https://github.com/rubygems/rubygems.git /home/rubygems/ \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /home/rubygems

RUN git submodule update --init && ruby setup.rb \
	&& gem install jekyll

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
