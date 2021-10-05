import queryStringify from './queryStringify';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  method?: Method
  data?: Record<string, unknown>,
  headers?: Record<string, string>,
  timeout?: number,
}

const defaultMethod = Method.GET;
const defaultTimeout = 5000;

export default class HTTP {
  static BASE_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTP.BASE_URL}${endpoint}`;
  }

  public get<Response>(path = '/', options: Options = {}): Promise<Response> {
    return HTTP.request(
      this.endpoint + path,
      { ...options, method: Method.GET },
    );
  }

  public post<Response>(path = '/', options: Options = {}): Promise<Response> {
    return HTTP.request(
      this.endpoint + path,
      { ...options, method: Method.POST },
    );
  }

  public put<Response>(path = '/', options: Options = {}): Promise<Response> {
    return HTTP.request(
      this.endpoint + path,
      { ...options, method: Method.PUT },
    );
  }

  public delete<Response>(path = '/', options: Options = {}): Promise<Response> {
    return HTTP.request(
      this.endpoint + path,
      { ...options, method: Method.DELETE },
    );
  }

  private static request<Response>(url: string, options: Options): Promise<Response> {
    const {
      method = defaultMethod,
      data,
      headers = {},
      timeout = defaultTimeout,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === Method.GET;
      const requestUrl = isGet ? url + queryStringify(data) : url;

      xhr.open(method, requestUrl);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(`${xhr.status}: ${xhr.statusText}`));
        }
      };

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      const body = isGet || !data
        ? null
        : JSON.stringify(data);

      xhr.send(body);
    });
  }
}
