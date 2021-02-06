Hypixel Guild Scanner
=====================

A [VueJS](https://vuejs.org/) and [TailwindCSS](https://tailwindcss.com/) app that makes it easy to scan [Hypixel SkyBlock](https://hypixel.net/) guilds to get guild averages and guild player stats, this system utilizes the [Hypixel SkyBlock Facade](https://github.com/Senither/hypixel-skyblock-facade) API to make fetching player information a lot easier.

## Table of Content

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [License](#license)

### Prerequisites

> Items with a * in front of their name are only required if you want you use the Laravel [Mix versioning](https://laravel-mix.com/docs/5.0/versioning). 

- NodeJS >= 14
- *PHP >= 7.4
- *Composer >= 2

### Installation

To get started, clone down the repository using:

    git clone https://github.com/Senither/hypixel-skyblock-guild-scanner.git

Next go into the `hypixel-skyblock-guild-scanner` folder and install all the dependencies using Yarn or NPM.

    yarn install

    npm install

When all the dependencies have been installed you're now ready to build all the assets for production, to do this run:

    yarn prod

You can also build the assets for development mode by using `yarn dev` or `yarn watch`, when building for production you'll get minified JS and CSS files, and all unused [TailwindCSS](https://tailwindcss.com/) styles will automatically be removed from the CSS file to lower the file sizes, when building for development then all styles will be included, and non of the code will be minified, additionally a source map for the code will also be generated to help make it easier to debug errors in the Vue components during development.

You're technically done with setting up the site, if you choose to stop here you would have to rename the `index.php` file to `index.html` and remove/replace the PHP specific code(3 lines of text), however if you want to use the Mix versioning that comes with [Laravel Mix](https://laravel-mix.com/) you'll need PHP and Composer installed too, to setup the Composer Autoloader all you need to do is run:

    composer install

That will generate the Composer `vendor/` directory and ensure that all the files needed by PHP is generated and autoloaded, from there you can open the `index.php` file in any PHP server to serve the site.

## License

Hypixel Guild Scanner is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).
