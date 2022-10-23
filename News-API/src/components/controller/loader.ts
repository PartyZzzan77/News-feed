import { ApiEndPoint, CallbackVoid } from './../../types/types';
import { ILoader, ApiStatusCheck } from '../../types/types';
class Loader implements ILoader {
  public readonly baseLink: string;
  public readonly options: { apiKey: string };

  constructor(baseLink: string, options: { apiKey: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint = 'sources', options = {} }: ApiEndPoint,
    callback: CallbackVoid = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  public errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === ApiStatusCheck.BadRequest || res.status === ApiStatusCheck.PageNotAvailable)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }

  public makeUrl(options: Record<string, string>, endpoint = 'sources') {
    const urlOptions: Record<string, string> = { ...this.options, ...options };

    let url = `${this.baseLink}${endpoint}?` as string;

    Object.keys(urlOptions).forEach((key: string) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  public load<T>(method: string, endpoint = 'sources', callback: (data: T) => void, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: T) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
