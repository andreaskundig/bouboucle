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

npm run tag-looper looper-1.0.2 # creates branch *looper-1.02* on looper subtree
npm run tag-looper-ui looper-ui-1.0.2 # creates branch *looper-ui-1.02* on looper-ui subtree
```


## looper-ui


### ui variants

Goal is to support three variants:
- default
- local
- advanced

### html template preparation
To avoid issues in deploying the visual assets used by the looper-ui, we replace all img tags with the literal svg content. the original html templates are found in /packages/looper-ui/htmlTemplates. They have the file extension .template. A transformation script injects the literal svg content and resaves the template file with a .js extension.

```
    node lib\injectSvgsInHtmlTemplate.js packages\looper-ui\htmlTemplates\defaultHtmlTemplate.template
```

will create a .js file in the htmlTemplates folder


# git remotes

```
> git remote -v
looper-origin   https://github.com/andreaskundig/looper.git (fetch)
looper-origin   https://github.com/andreaskundig/looper.git (push)
looper-ui-origin        https://github.com/andreaskundig/looper-ui.git (fetch)
looper-ui-origin        https://github.com/andreaskundig/looper-ui.git (push)
origin  https://github.com/andreaskundig/bouboucle.git (fetch)
origin  https://github.com/andreaskundig/bouboucle.git (push)
```
