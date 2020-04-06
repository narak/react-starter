#!/bin/bash
PUBLIC_PATH="/react-app"

echo "Starting build..."
yarn
PRODUCTION=true PUBLIC_PATH=$PUBLIC_PATH yarn build

echo "Creating bundle..."
mkdir -p temp/static
cp -r static temp
rm temp/static/index*
sed "s~\[\[PUBLIC_PATH\]\]~${PUBLIC_PATH}~g" static/index_prod.html > temp/index.html

cd temp
tar -czvf ../build.tgz .
cd -
rm -rf temp

echo '-- Done --'
