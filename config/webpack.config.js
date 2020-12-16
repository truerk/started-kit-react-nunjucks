const path                      = require('path');
const CopyWebpackPlugin         = require("copy-webpack-plugin");
const MiniCssExtractPlugin      = require("mini-css-extract-plugin");
const getCSSModuleLocalIdent    = require('react-dev-utils/getCSSModuleLocalIdent');
const generateNunjucksHtml      = require('nunjucks-template-loader/utils/generateNunjucksHtml');
const nunjucksFilters           = require('nunjucks-template-loader/filters');

const PATHS = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
    templateGlobPath: path.resolve(__dirname, '../templates/**/'),
    pagesGlobPath: path.resolve(__dirname, '../templates/pages/**/'),
    pagesPath: path.resolve(__dirname, '../templates/pages'),
    assets: 'assets',
    bundles: 'bundles'
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        // vendors for chunks inject
        helloWorldForStore: [
            `${PATHS.src}/js/helloWorldForStore.js`,
        ],
        helloWorldForIndex: [
            `${PATHS.src}/js/helloWorldForIndex.js`,
        ],
        // pages
        index: [
            `${PATHS.src}/js/react/index.jsx`,
            `${PATHS.src}/scss/index.js`,
        ],
        store: [
            `${PATHS.src}/js/index.js`,
            `${PATHS.src}/scss/index.js`,
        ]
    },
    output: {
        path: PATHS.dist,
        filename: `${PATHS.bundles}/js/[name].[chunkhash].js`,
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@ui': path.resolve(__dirname, '../node_modules/pobeda-ui/src/ui/js'),
            '@utils': path.resolve(__dirname, '../node_modules/pobeda-ui/src/ui/utils'),
        }
    },
    module: {
        rules: [
            {
                test: /\.module\.(sa|sc|c)ss$/,
                exclude: /(node_modules)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                getLocalIdent: getCSSModuleLocalIdent,
                            },
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: path.resolve(__dirname, './postcss.config.js') }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: [/(node_modules)/, /\.module\.(sa|sc|c)ss$/],
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,

                            config: { path: path.resolve(__dirname, './postcss.config.js') }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.html$|njk|nunjucks/,
                exclude: [/(node_modules)/, /(src)/],
                use: [
                    'html-loader',
                    {
                        loader: 'nunjucks-template-loader',
                        options: {
                            paths: PATHS.templateGlobPath,
                            filters: nunjucksFilters,
                            data: {
                                title: 'projectTitle',
                                foo: 'indexBar'
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/${PATHS.assets}/`, to: `${PATHS.assets}/` },
                { from: `${PATHS.src}/static/`, to: '' }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.bundles}/css/[name].[contenthash].css`,
            chunkFilename: "[id].css"
        }),
    ]
    .concat(generateNunjucksHtml(PATHS.pagesGlobPath, PATHS.pagesPath, {
        minify: false,
        inject: true,
        chunks: {
            index: [
                'helloWorldForIndex',
            ],
            store: [
                'helloWorldForStore',
            ],
        }
    }))
};
