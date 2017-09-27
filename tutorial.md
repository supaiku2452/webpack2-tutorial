# webpack2 チュートリアル

webpack2の基本的な使用方法を理解するためのチュートリアル
[チュートリアル](https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783)

基本的には**写経**となります。

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