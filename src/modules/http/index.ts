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

class HTTP {
  get = (url: string, options: Options = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      { ...options, method: Method.GET },
    ));

  post = (url: string, options: Options = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      { ...options, method: Method.POST },
    ));

  put = (url: string, options: Options = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      { ...options, method: Method.PUT },
    ));

  delete = (url: string, options: Options = {}): Promise<XMLHttpRequest> => (
    this.request(
      url,
      { ...options, method: Method.DELETE },
    ));

  request = (url: string, options: Options): Promise<XMLHttpRequest> => {
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
  };
}

export default HTTP;
