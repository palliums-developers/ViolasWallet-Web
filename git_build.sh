#!/bin/bash
git pull origin web-wallet-connect
yarn build
sudo cp -rf ./build/* /var/www/wallet.violas.io/
echo 'finished' date
