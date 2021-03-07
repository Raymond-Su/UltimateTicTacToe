#!/usr/bin/env bash

CWD=$(pwd)

# Build client dependancies and dist
cd $CWD/client 
npm install
npm run build

# Build server dependancies
cd $CWD
npm install
tsc
