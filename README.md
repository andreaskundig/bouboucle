# bouboucle

to publish a package

``` sh
cd packages/looper
```

Don't forget to update the "version": 10.xx in package.json.

``` sh
git commit -m 'version 1.0.xx'
npm publish
```
## subtree

move package to subtree
``` bash
git remote add origin https://github.com/andreaskundig/looper.git
git subtree add --prefix=packages/looper looper-origin master
# haven't tried that yet
git subtree push --prefix=packages/looper looper_origin master
```
