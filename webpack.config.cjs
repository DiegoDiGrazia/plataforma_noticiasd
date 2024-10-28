const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.jsx', // Cambia según tu archivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Para manejo de rutas en React Router
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html', // Usar tu archivo HTML base
      inject: true,
    }),
  ],
  devServer: {
    historyApiFallback: true, // Para rutas en SPA (Single Page Applications)
    compress: true,
    hot: true,
    port: 4000, // Puerto de desarrollo
    proxy: [
      {
        context: ['/api', '/codigo_recuperacion', '/cambiar_clave', '/app_obtener_usuarios', 
                  '/app_obtener_notas', '/app_obtener_medios', '/app_obtener_categorias', 
                  '/reporte_descargarpdfwa', '/app_obtener_noticias', '/app_obtener_noticia', '/app_obtener_medios_noticia',
                  '/app_obtener_impresiones_plataforma_noticia', '/app_obtener_listado_categorias'],
        target: 'https://panel.serviciosd.com/',
        changeOrigin: true,
      },
    ],
  },
  mode: 'development', // Cambiar a 'production' para generar el bundle final
};