import queryStringify from './queryStringify';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  method?: Method
  data?: Record<string, string>,
  headers?: Record<string, string>,
  timeout?: number,
}

const defaultMethod = Method.GET;
const defaultTimeout = 5000;

class HTTP {
  get = (url: string, options: Options = {}) =>
    this.request(
      url,
      { ...options, method: Method.GET },
    );


  post = (url: string, options: Options = {}) =>
    this.request(
      url,
      { ...options, method: Method.POST },
    );

  put = (url: string, options: Options = {}) =>
    this.request(
      url,
      { ...options, method: Method.PUT },
    );

  delete = (url: string, options: Options = {}) =>
    this.request(
      url,
      { ...options, method: Method.DELETE },
    );

  request = (url: string, options: Options) => {
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

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
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
