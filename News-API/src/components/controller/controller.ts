import { APIEndpoints } from '../../types/types';

import AppLoader from './appLoader';
class AppController extends AppLoader {
  getSources(callback: () => void) {
    super.getResp(
      {
        endpoint: APIEndpoints.sources,
      },
      callback
    );
  }

  public getNews<T extends HTMLElement>(e: Event, callback: () => void): void {
    let target = e.target as T;
    const newsContainer = e.currentTarget as T;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId: string | null = target.getAttribute('data-source-id');
        if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: APIEndpoints.everything,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as T;
    }
  }
}

export default AppController;
