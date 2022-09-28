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

The first time the library was published, the publish command was different
``` sh
npm publish --access public
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
