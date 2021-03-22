#!/bin/bash
git pull origin outside
yarn build
sudo cp -rf ./build/* /var/www/devwallet.violas.io/
date
