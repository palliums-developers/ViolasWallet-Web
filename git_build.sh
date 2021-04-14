#!/bin/bash
git pull origin walletconnect-demo
yarn build
sudo cp -rf ./build/* /home/ops/huangw/nginx/api2.violas.io
date
