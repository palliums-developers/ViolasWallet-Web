git pull origin newnet_web
yarn build
sudo cp -rf ./build/* /var/www/newnet.violas.io/
