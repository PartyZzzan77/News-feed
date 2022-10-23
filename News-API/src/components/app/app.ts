import { EndPoint, TopHeadlines, IApp } from '../../types/types';

import AppController from '../controller/controller';

import { AppView } from '../view/appView';
class App implements IApp {
  readonly controller: AppController;
  readonly view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start<E extends EndPoint, S extends TopHeadlines>(): void {
    const sources: Element | null = document.querySelector('.sources');
    if (sources) {
      sources.addEventListener('click', (e) => {
        this.controller.getNews(e, (data?: E) => {
          if (data) {
            this.view.drawNews(data);
          }
        });
      });

      this.controller.getSources((data?: S): void => {
        if (data) {
          this.view.drawSources(data);
        }
      });
    }
  }
}

export default App;
