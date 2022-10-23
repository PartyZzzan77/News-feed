import App from './components/app/app';

import './global.css';

import logoImage from './assets/img/rs_school_js.svg';

const logoFooter = document.querySelector('.copyright__logo') as HTMLImageElement;
if (logoFooter) {
  logoFooter.src = logoImage;
}

const app: App = new App();
app.start();
