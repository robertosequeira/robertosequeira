# Personal website

## Serve development website using browser sync

```
browser-sync start -s --files='*.html, css/*.css, js/*.js'
browser-sync start -s --directory --files='*.html, css/*.css, js/*.js'
```

## Gulp tasks

1. To compile .less files and start watching for changes in less files

    ```
    gulp
    ```

2. To generate files to be deployed to the server

    ```
    gulp build
    ```

3. To build website and serve generated site

    ```
    gulp server
    ```

4. To merge all svg icons into a single files

    ```
    gulp svgstore
    ```


# Icons

All from http://svgporn.com/ except from ruby icon (http://devicon.fr/)