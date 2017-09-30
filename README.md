# webpack2 チュートリアル

webpack2の基本的な使用方法を理解するためのチュートリアル
[チュートリアル](https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783)

基本的には**写経**となります。
また、チュートリアルとして参考にしたページの全てを実践しているわけではなく、
基本的な構文のみ実践している。

## First Step

1. **yarn**を使って**webpack**と**webpack-dev-server**をインストールする。
**yarn**がなければ、`npm install`で**yarn**をインストールする(brewでのインストールも可能)。

```
yarn add --dev webpack webpack-dev-server
```

2. **webpack.config.js**を作成する。

```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
};
```

3. **yarn**で**moment**をインストールする。

4. app.jsを作成する。

```javascript
import moment from 'moment';

var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log(rightNow);

```

5. `webpack -p`を実行する。(`-p`は、プロダクションモードでの実行を意味する。ファイルサイズを小さく、中身を見づらくする。)

## Working with Multiple Files

1. **webpack.config.js**の`entry`を複数定義する。

```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: ['./app.js', './events.js', './vendor.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
};
```

events.jsは、以下のとおり
```
document.write("events");
```

vendor.jsは、以下のとおり
```
document.write("vendor");
```


2. `webpack (-p)`を実行する。

バンドルされた**app.bundle.js**を見ると、別々に定義したjsが一つにまとめられていることがわかる。
```javascript

/***/ }),
/* 120 */
/***/ (function(module, exports) {

document.write("events");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

document.write("vendor");

/***/ })
/******/ ]);
```

## Multiple files, multiple outputs

1. **webpack.config.jsの`entry`を別々に定義する。**

```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js',
        events: './events.js',
        vendor: './vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
};
```

2. `webpack (-p)`を実行する。
実行後のdistディレクトリには、**app.bundle.js/events.bundle.js/vendor.bundle.js**が生成されている。

## Loaders

1. Babelをインストールする。

`yarn add --dev babel-loader babel-core babel-preset-es2015`

2. webpackを修正する。

```javascript

module.exports = {
// ...
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                  loader: 'babel-loader',
                    options: { presets: ['es2015']}
                }]
            }
        ]
    },
// ...
};
```

cssのローダーを追加する場合は、以下定義を追加する(**style-loader**と**css-loader**を追加しておくこと)。

```javascript
module.exports = {
// ...
    module: {
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
// ...
};
```

3. `webpack (-p)`を実行する。