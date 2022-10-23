import News from './news/news';

import Sources from './sources/sources';

import { EndPoint, TopHeadlines, IAppView } from '../../types/types';
export class AppView implements IAppView<EndPoint, TopHeadlines> {
  readonly news: News;
  readonly sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: EndPoint): void {
    const values: EndPoint['articles'] = data.articles;
    this.news.draw(values);
  }

  drawSources(data: TopHeadlines) {
    const values: TopHeadlines['sources'] = data.sources;
    this.sources.draw(values);
  }
}

export default AppView;
