

BRANCH=`git rev-parse --abbrev-ref HEAD`
DIR="WeWork-China-MiniApps/"
if [[ ! -e "$DIR" ]]; then
  # checkout
  `git clone git@github.com:WeConnect/WeWork-China-MiniApps.git  -b $BRANCH`
fi

yarn --registry https://registry.npmjs.org

rm -rf ./dist/miniapps/
mkdir -p ./dist/miniapps/

pushd WeWork-China-MiniApps

git checkout $BRANCH
git pull origin $BRANCH 

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