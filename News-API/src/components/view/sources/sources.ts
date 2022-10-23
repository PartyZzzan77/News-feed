import { Resources, TopHeadlines } from '../../../types/types';

import './sources.css';

class Sources implements Resources<TopHeadlines> {
  public draw(data: TopHeadlines['sources']): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as Element;

      const sourceItemName: Element | null = sourceClone.querySelector('.source__item-name');
      if (sourceItemName) {
        sourceItemName.textContent = item.name;
      }
      const sourceItem: Element | null = sourceClone.querySelector('.source__item');
      if (sourceItem) {
        sourceItem.setAttribute('data-source-id', item.id);
      }

      fragment.append(sourceClone);
    });

    const sources: Element | null = document.querySelector('.sources');
    if (sources) {
      sources.append(fragment);
    }
  }
}

export default Sources;
