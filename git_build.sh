#!/bin/bash
git pull origin outside
yarn build
sudo cp -rf ./build/* /var/www/wallet.violas.io/
date
