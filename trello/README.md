#
##
### SCSS
```sh
    # 모듈설치 
    npm install -D sass
    npm install -D svelte-preprocess
```
- svelte.config.js
```js
    import preprocess from 'svelte-preprocess';
    const config = {
        preprocess: preprocess({}),
    }
```

### 공급업체접두사
```sh
    npm install -D autoprefixer
    npm install -D postcss
```
- svelte.config.js
```js
    import preprocess from 'svelte-preprocess';
    import autoprefixer from 'autoprefixer'
    const config = {
        preprocess: preprocess({

            plugins: [
                autoprefixer
            ]
        }),
    }
```