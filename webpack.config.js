/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const webpack = require('webpack')
const path = require('path')
const fileSystem = require('fs-extra')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const sass = require('node-sass')

const environment = require('./utils/env')

// load the secrets
const alias = {
	'react-dom': '@hot-loader/react-dom',
}

const secretsPath = path.join(__dirname, `secrets.${environment.NODE_ENV}.js`)

const fileExtensions = [
	'jpg',
	'jpeg',
	'png',
	'gif',
	'eot',
	'otf',
	'svg',
	'ttf',
	'woff',
	'woff2',
]

if (fileSystem.existsSync(secretsPath)) {
	alias.secrets = secretsPath
}

const options = {
	mode: process.env.NODE_ENV || 'development',
	entry: {
		newtab: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.jsx'),
		options: path.join(__dirname, 'src', 'pages', 'Options', 'index.jsx'),
		popup: path.join(__dirname, 'src', 'pages', 'Popup', 'index.jsx'),
		background: path.join(__dirname, 'src', 'pages', 'Background', 'index.js'),
		contentScript: path.join(__dirname, 'src', 'pages', 'Content', 'index.js'),
		contentScriptSubPage: path.join(__dirname, 'src', 'pages', 'Content', 'subpage.js'),
	},
	chromeExtensionBoilerplate: {
		notHotReload: ['contentScript'],
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				// look for .css or .scss files
				test: /\.(css|scss)$/,
				// in the `src` directory
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: new RegExp(`.(${fileExtensions.join('|')})$`),
				loader: 'file-loader?name=[name].[ext]',
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		alias,
		extensions: fileExtensions
			.map(extension => `.${extension}`)
			.concat(['.jsx', '.js', '.css']),
	},
	plugins: [
		new webpack.ProgressPlugin(),
		// clean the build folder
		new CleanWebpackPlugin({
			verbose: true,
			cleanStaleWebpackAssets: false,
		}),
		// expose and write the allowed env vars on the compiled bundle
		new webpack.EnvironmentPlugin(['NODE_ENV']),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src/manifest.json',
					to: path.join(__dirname, 'build'),
					force: true,
					transform(content, path) {
						// generates the manifest file using the package.json informations
						return Buffer.from(
							JSON.stringify({
								description: process.env.npm_package_description,
								version: process.env.npm_package_version,
								...JSON.parse(content.toString()),
							}),
						)
					},
				},
			],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src/pages/Content/content.styles.scss',
					to: `${path.join(__dirname, 'build')}/content.styles.css`,
					force: true,
					transform(content, path) {
						const result = sass.renderSync({
							file: path,
						})
						return result.css.toString()
					},
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.html'),
			filename: 'newtab.html',
			chunks: ['newtab'],
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pages', 'Options', 'index.html'),
			filename: 'options.html',
			chunks: ['options'],
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pages', 'Popup', 'index.html'),
			filename: 'popup.html',
			chunks: ['popup'],
		}),
		new HtmlWebpackPlugin({
			template: path.join(
				__dirname,
				'src',
				'pages',
				'Background',
				'index.html',
			),
			filename: 'background.html',
			chunks: ['background'],
		}),
		new WriteFilePlugin(),
	],
}

if (environment.NODE_ENV === 'development') {
	options.devtool = 'cheap-module-eval-source-map'
}

module.exports = options
