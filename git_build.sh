#!/bin/bash
git pull origin inside
yarn build
sudo cp -rf ./build/* /var/www/devwallet.violas.io/
date
