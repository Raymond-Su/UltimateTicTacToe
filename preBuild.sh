#!/usr/bin/env bash

CWD=$(pwd)

# Install client dependancies and build dist
cd $CWD/client 
npm install
npm install --only=dev
npm run build

# Install server dependancies
cd $CWD
npm install
npm install --only=dev