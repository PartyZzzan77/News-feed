import { Resources, EndPoint } from '../../../types/types';

import './news.css';

import placeholderImg from './../../../assets/img/news_placeholder.jpg';
class News implements Resources<EndPoint> {
  public draw(data: EndPoint['articles']) {
    const news = data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

    news.forEach((item, idx: number): void => {
      const newsClone = newsItemTemp.content.cloneNode(true) as Element;

      if (idx % 2) {
        const newsItem: HTMLDivElement | null = newsClone.querySelector('.news__item') as HTMLDivElement;
        if (newsItem) {
          newsItem.classList.add('alt');
        }
        const newsPhoto: HTMLElement | null = newsClone.querySelector<HTMLElement>('.news__meta-photo');

        if (newsPhoto) {
          newsPhoto.style.backgroundImage = `url(${item.urlToImage || placeholderImg})`;
        }
        const newsAuthor: HTMLLIElement | null = newsClone.querySelector('.news__meta-author');
        if (newsAuthor) {
          newsAuthor.textContent = item.author || item.source.name;
        }
        const newsDate: HTMLLIElement | null = newsClone.querySelector('.news__meta-date');

        if (newsDate && item.publishedAt) {
          newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
        }

        const newsDescriptionTitle: HTMLHeadingElement | null = newsClone.querySelector('.news__description-title');

        if (newsDescriptionTitle && item.title) {
          newsDescriptionTitle.textContent = item.title;
        }

        const newsDescriptionSource: HTMLHeadingElement | null = newsClone.querySelector('.news__description-source');

        if (newsDescriptionSource && item.source.name) {
          newsDescriptionSource.textContent = item.source.name;
        }
        const newsDescriptionContent: HTMLParagraphElement | null = newsClone.querySelector(
          '.news__description-content'
        );
        if (newsDescriptionContent && item.description) {
          newsDescriptionContent.textContent = item.description;
        }

        const newsReadMore: HTMLParagraphElement | null = newsClone.querySelector('.news__read-more a');
        if (newsReadMore) {
          newsReadMore.setAttribute('href', item.url);
        }

        fragment.append(newsClone);
      }
    });

    const article: HTMLDivElement | null = document.querySelector('.news');
    if (article) {
      article.innerHTML = '';
      article.appendChild(fragment);
    }
  }
}

export default News;
