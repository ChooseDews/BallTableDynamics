
import Vue from 'vue';
import App from './App.vue';
import "./node_modules/latex.css/style.min.css";
import './style.scss';
import "./node_modules/mathjax/es5/tex-mml-svg.js"
//import "./node_modules/material-icons/css/material-icons.min.css";
import "./node_modules/material-icons/iconfont/material-icons.css"

new Vue({ render: createElement => createElement(App) }).$mount('#app');