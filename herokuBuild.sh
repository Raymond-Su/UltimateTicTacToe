#!/usr/bin/env bash

CWD=$(pwd)

# Build client dependancies and dist
cd $CWD/client 
npm install
npm install --only=dev
npm run build