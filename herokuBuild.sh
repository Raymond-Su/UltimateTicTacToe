#!/usr/bin/env bash

# Build client dependancies and dist
CWD=$(pwd)
cd $CWD/client 
npm install
npm run build

# Build server dependancies
cd $CWD
npm install
tsc
