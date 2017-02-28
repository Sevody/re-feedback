import webpack from 'webpack';
import path from 'path';
import os from 'os';
import autoprefixer from 'autoprefixer';

// 多线程编译
import HappyPack from 'happypack';
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const happyPackPlugin = new HappyPack({
    id: 'happybabel',
    loaders: ['babel-loader'],
    threadPool: happyThreadPool,
    cache: true,
    verbose: true
})

const ISPROD = process.env.NODE_ENV === 'prod' ? true : false;
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config = {
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: nodeModulesPath, loader: 'happypack/loader?id=happybabel'},
            {test: /\.(svg|png|jpg|otf)$/, exclude: nodeModulesPath, loader: 'url-loader'}
        ]
    },

    plugins: [happyPackPlugin],

    postcss: [
        autoprefixer({
          browsers: ['last 5 versions', '> 1%']
        })
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.css'],
    }
}

// 开发环境配置
if (!ISPROD) {
    config.entry = {
        "basic": path.resolve(__dirname, 'examples/basic.jsx'),
    };
    config.output = {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: 'http://localhost:8080/dist/'
    };
    config.devtool = "inline-source-map";
    config.module.loaders.push(
        {
            test: /\.(css|less)$/,
            loader: "style!css?sourceMap!postcss!less?sourceMap=true"
        }
    );
}

// 如果是生成环境就编译成 UMD
if (ISPROD) {
    config.entry = './index.js';
    config.output = {
        path: path.resolve(__dirname, 'dist'),
        library: 're-feedback',
        libraryTarget: 'umd',
        filename: 'index.js'
    };
    config.module.loaders.push(
        {
            test: /\.(css|less)$/,
            loader: "style!css!postcss!less"
        }
    );
}

export default config;
