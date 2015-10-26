echo 'Step 0: Kill ALL THE THINGS... in `dist/`'

rm -rf dist/*

echo 'Step 1: Copy all the HTML'
cp src/index.html dist/
mkdir dist/partials/
cp -r src/partials dist/partials/

echo 'Step 2: Build all the Sass into CSS!'
mkdir dist/css
node-sass src/scss/main.scss dist/css/main.css

echo 'Step 3: Copy all the JS'
mkdir -p dist/js
cp -r src/js dist/

echo 'Step 4: Copy all the `bower_components/`!'

echo 'Step 4a: Normalize the CSS...'
mkdir -p dist/bower_components/normalize-css/
cp bower_components/normalize-css/normalize.css dist/bower_components/normalize-css/normalize.css

echo 'Step 4b: ????'
mkdir -p dist/bower_components/jquery/dist/
cp bower_components/jquery/dist/jquery.js dist/bower_components/jquery/dist/jquery.js

mkdir -p dist/bower_components/angular/
cp bower_components/angular/angular.js dist/bower_components/angular/angular.js

mkdir -p dist/bower_components/angular-route/
cp bower_components/angular-route/angular-route.js dist/bower_components/angular-route/angular-route.js

echo 'Step 5: Copy img folder'
cp  -r src/img/ dist/img

npm run start
