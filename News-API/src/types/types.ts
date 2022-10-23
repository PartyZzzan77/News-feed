export enum ApiStatusCheck {
  ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  PageNotAvailable = 404,
  TooManyRequests = 429,
  ServerError = 500,
}

export enum APIEndpoints {
  sources = 'sources',
  everything = 'everything',
}
export interface Resources<T extends EndPoint | TopHeadlines> {
  draw: (data: T extends EndPoint ? EndPoint['articles'] : TopHeadlines['sources']) => void;
}

export type ApiEndPoint = {
  endpoint?: string;
  options?: Record<string, string>;
};

export type CallbackVoid = () => void;
export interface ILoader {
  readonly baseLink: string;
  readonly options: { apiKey: string };

  getResp: ({ endpoint, options }: ApiEndPoint, callback?: CallbackVoid) => void;

  errorHandler: (res: Response) => Response;

  makeUrl: (options: Record<string, string>, endpoint?: string) => string;

  load: <T>(method: string, endpoint: string, callback: (data: T) => void, options?: Record<string, string>) => void;
}
export interface IAppController {
  getNews: (e: Event, callback: () => void) => void;
}
export interface IAppView<E extends EndPoint, T extends TopHeadlines> {
  readonly news: Resources<E>;
  readonly sources: Resources<T>;

  drawNews: (data: E) => void;

  drawSources: (data: T) => void;
}
export interface IApp {
  controller: IAppController;
  view: IAppView<EndPoint, TopHeadlines>;
  start: () => void;
}

export type TopHeadlines = {
  status: string;
  sources: Source[];
};

export type Everything = Pick<TopHeadlines, 'status'> & {
  totalResults: number;
  articles: Article[];
};

export type EndPoint = Pick<Everything, 'status' | 'articles' | 'totalResults'>;

type Source = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

type Article = {
  source: Pick<Source, 'id' | 'name'>;
  author: string;
  title: string;
  url: string;
  content: string | null;
  description?: string;
  urlToImage?: string;
  publishedAt?: string;
};
