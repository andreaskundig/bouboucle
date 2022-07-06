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
git remote add looper-origin https://github.com/andreaskundig/looper.git
git subtree add --prefix=packages/looper looper-origin master
# push to subtree repo
git subtree push --prefix=packages/looper looper-origin master
# push a tag creates a branch on the subtree repo
git subtree push --prefix=packages/looper looper-origin looper-1.0.3
```

or  

```
npm run push-looper   # push to looper repo
npm run push-looper-ui   # push to looper-ui repo

npm run tag-looper looper-1.0.2 # tags branch with version *1.0.2*
npm run tag-looper-ui looper-ui-1.0.2 # tags branch with version *1.0.2*
```
