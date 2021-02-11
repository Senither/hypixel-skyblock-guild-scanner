# Prepares the app to be built
FROM node:14-alpine as build-stage

# Setup the working directory
WORKDIR /app

# Copy over our Package, Webpack & Tailwind configs
COPY package.json /app/
COPY yarn.lock /app/
COPY webpack.mix.js /app/
COPY webpack.config.js /app/
COPY tailwind.config.js /app/

# Copy over our source code
COPY assets /app/assets
COPY public /app/public

# Copy over our Docker specefic files
COPY docker/config.js /app/config.js
COPY docker/.htaccess /app/public/.htaccess

# Install dependencies and build our assets for production
RUN yarn install \
  && yarn production

# Setups Apache to serve our built files
FROM httpd:alpine as production-stage

# Copies our compiled files from the build stage into the default Apache directory
COPY --from=build-stage /app/public /usr/local/apache2/htdocs/

# Enable mod rewriting so we can correctly use our .htaccess file
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
  sed -i 's#AllowOverride [Nn]one#AllowOverride All#' /usr/local/apache2/conf/httpd.conf

# Expose port 80 so we can see our files
EXPOSE 80
