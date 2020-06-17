
## Tips

Try `npm i` to start the project.

When you see this error

```bash
npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm ERR! code ENOLOCAL
npm ERR! Could not install from "WeWork-China-MiniApps/framework/appkit/library" as it does not contain a package.json file.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/dendoink/.npm/_logs/2020-06-17T02_45_33_798Z-debug.log
```

Run this command could help(This may take 7 minutes :D ):

``` bash
./build-miniapps.sh feature/desktop #replace the branch to your working branch
```