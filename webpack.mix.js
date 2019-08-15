const mix = require('laravel-mix');

mix.setResourceRoot('');

mix.js('src/js/select-propagation.js', 'dist');
mix.copyDirectory('dist', 'demo/resources');