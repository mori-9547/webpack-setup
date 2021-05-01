# Front-End Setup



```bash
git clone <HTTPS or SSH>
cd frontend-setup

npm install
```


## project directory

```bash
Project/
    ├── dist/ 
        // コンパイル時に出力
        ├── images/
        ├── bundle.js
        ├── common.css
        └── main.js //--mode=production (babel file)

    ├── src/
        ├── images/
        ├── js/
        └── main.js
    ├── sass/
        └── main.scss
    └── index.js // entry point
 
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── .babelrc
    └── webpack.config.js
```


