const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { push_uniq } = require('terser')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const autoprefixer = require('autoprefixer');
const plugin = autoprefixer({ grid: true });




const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}
	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetPlugin(),
			new TerserWebpackPlugin(),
		]
	}
	return config
}
const cssLoader = (extra) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: isDev,
				reloadAll: true
			},
		},
		'css-loader', {
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					plugins: [
						[
							'autoprefixer',
							{
								grid: true,
							},
						],
					],
				},
			},
		},
	]
	if (extra) { loaders.push(extra) }
	return loaders
}
const babelOptions = preset => {
	opts = {
		presets: [
			'@babel/preset-env'
		],
		plugins: [
			'@babel/plugin-proposal-class-properties'
		]
	}
	if (preset) {
		opts.presets.push(preset)
	}
	return opts

}

module.exports = {
	context: path.resolve(__dirname, '#src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js'],

	},


	output: {
		filename: `[name].bundle.js`,
		path: path.resolve(__dirname, `dist`)
	},
	resolve: {
		extensions: ['.js', '.json', '.svg',],
		alias: {
			'@': path.resolve(__dirname, '#src'),
			'@main': path.resolve(__dirname, '#src'),
			'@i': path.resolve(__dirname, `dist`),
		},
	},
	optimization: optimization(),
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000,
		hot: isDev
	},

	plugins: [


		new CopyWebpackPlugin({
			patterns: [
				{
					// 	from: "./assets/fonts",
					// 	to: "./../../assets/fonts",
					// },
					// {
					// 	from: "./src/favicon",
					// 	to: "./favicon",
					// },
					// {
					from: "./assets",
					to: "./assets",
					// },

					// {
					// 	from: "./src/uploads",
					// 	to: "./uploads",
				},
			],
		}),
		new HTMLWebpackPlugin(
			{
				filename: './index.html',
				template: './index.html',
				minify: {
					collapseWhitespace: isProd
				}
			}
		),


		new MiniCssExtractPlugin({
			filename: `./style.css`,
		})
		,
		new CleanWebpackPlugin(),
	],

	module: {
		rules: [
			{
				test: /\.html$/,
				include: path.resolve(__dirname, '#src/includes'),
				use: ["raw-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions()
				}
			},
			{
				test: /\.less$/,
				use: cssLoader('less-loader')
			},
			{
				test: /\.css$/,
				use: ['css-loader', 'postcss-loader'],

			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoader('sass-loader')
			},
			{
				test: /\.(png|jpg|svg|gif|webp)$/,
				use: {
					loader: "file-loader",
					options: {
						name: '[path][name].[ext]',
						outputPath: './'
					}
				}
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: {
					loader: "file-loader",
					options: {
						name: '[path][name].[ext]',
						outputPath: './'
					}
				}
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			},
			{
				test: /\.csv$/,
				use: ['cvs-loader']
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-typescript')
				}
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-react')
				}
			},
		]
	}
}
function fontstyle() {
	let file_content = fs.readFileSync('./dist/pages/main/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(src_folder + 'pages/main/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(src_folder + 'pages/main/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}