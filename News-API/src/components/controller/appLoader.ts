import Loader from './loader';
class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: 'f4e3c3cc244046f094a012857bea83ee', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
