#!/bin/bash
cd ../packages
cd browser
tsc -p tsconfig.json
cd src
cp ./*.js ../../../walletConnect/browser
cd ../../core
tsc -p tsconfig.json
cd src
cp ./*.js ../../../walletConnect/core