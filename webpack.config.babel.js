import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';

process.env.BABEL_ENV = 'webpack';

module.exports = function(env) {
	env = env || {};

	const config = {
		// performance: {
		// 	hints: false
		// },
		context: path.resolve(__dirname),
		entry: {
			main: './src/main.js'
			// vendor: ''
		},
		output: {
		    path: path.resolve(__dirname, 'dist'),
		    filename: env.production ? '[name]-bundle-[chunkhash].js' : '[name]-bundle.js',
		    publicPath: '/'
		},
		devServer: {
			// compress: true,
			// contentBase: path.resolve(__dirname, 'dist'),
			host: '0.0.0.0',
  			port: 9000,
			noInfo: true,
			headers: {
  				"Access-Control-Allow-Origin": "*"
			}
		},
		devtool: env.production ? 'source-map' : 'cheap-module-source-map',
		module: {
			rules: [
				 {
				 	test: /\.js$/,
				 	exclude: /node_modules/,
				 	use: {
				 		loader: 'babel-loader'
					 // 	options: {
						//  	"presets": [["latest", {"es2015": {"modules": false}}]],
						//  	"plugins": [
						// 	    "syntax-flow",
						// 	    "transform-decorators-legacy",
						// 	    "transform-flow-strip-types",
						//      "syntax-dynamic-import"
						//     ]
						// }
				 	}
				 }
			]
		},
		plugins: [
			// new webpack.DefinePlugin({
		 //      'process.env': {
		 //        'NODE_ENV': JSON.stringify(env.production ? 'production' : 'development')
		 //      }
		 //    })
		 	new webpack.optimize.CommonsChunkPlugin({
	        	name: 'manifest'
    	 	}),
		 	new HtmlWebpackPlugin({template: 'index.html'}),
		 	new InlineManifestWebpackPlugin({
		        name: 'webpackManifest'
		    })
		]
	};

	if(env.production) {
		config.plugins.push(new BabiliPlugin({
            babel: require("babel-core"),
            babili: require("babel-preset-babili")
        }));
	}

	return config;
};