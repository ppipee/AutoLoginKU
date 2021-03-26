#!/bin/bash

ID=$1 
PW=$2
BROWSER_PATH=$3 
URL=$4

rm config.js

echo "module.exports = {
\tid: 'NONTRI_ID',
\tpassword: 'PASSWORD',
\tbrowserPath: 'BROWSER_PATH',
\turl:'LOGIN_URL',
}\n" >> "config.js"

sed -i -e 's,NONTRI_ID,'$ID',g' ./config.js 
sed -i -e 's,PASSWORD,'$PW',g' ./config.js 
sed -i -e 's,BROWSER_PATH,'$BROWSER_PATH',g' ./config.js 
sed -i -e 's,LOGIN_URL,'$URL',g' ./config.js 

