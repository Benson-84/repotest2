find . -name "node_modules" -type d -exec rm -rf "{}" \;
find . -name "package-lock.json" -type f -exec rm -rf {} \;
