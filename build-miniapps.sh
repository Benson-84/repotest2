
rm -rf WeWork-China-MiniApps/
rm -rf ./dist/miniapps/
mkdir -p ./dist/miniapps/

`git clone git@github.com:WeConnect/WeWork-China-MiniApps.git  -b $1` || `rm -rf WeWork-China-MiniApps/ && echo 'checkout master branch...' && git clone git@github.com:WeConnect/WeWork-China-MiniApps.git -b master`

pushd WeWork-China-MiniApps

# build tars library
./build.sh build-tars

echo "Copying MiniApps into WeWork China App..."
cp -rf ./output/*.zip ../dist/miniapps/

pushd ../dist/miniapps/

for d in `find . -name "miniapp-*.zip" -maxdepth 1` ; do
  FILENAME=$d
  FOLDER="${FILENAME%.*}"
  unzip $d -d $FOLDER
done

rm -rf *.zip

popd

popd