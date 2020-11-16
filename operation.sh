git pull origin newnet_web
echo '*****finished pull and start building'
yarn build
echo '*****finished build and start copy'
sudo cp -rf ./build/* /var/www/newnet.violas.io/
echo '*****All finished'
