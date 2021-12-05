import { expect } from 'chai';
import { useFakeXMLHttpRequest, SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';

import HTTP, { BASE_URL } from './index';

function mockHttp(): {
  fakeRequests: SinonFakeXMLHttpRequest[];
  FakeXMLHttpRequest: SinonFakeXMLHttpRequestStatic;
} {
  const fakeRequests: SinonFakeXMLHttpRequest[] = [];
  const FakeXMLHttpRequest = useFakeXMLHttpRequest();

  FakeXMLHttpRequest.onCreate = (request: SinonFakeXMLHttpRequest) => {
    fakeRequests.push(request);
  };

  Object.assign(global, {
    fakeRequests,
    XMLHttpRequest: FakeXMLHttpRequest,
  });

  return { fakeRequests, FakeXMLHttpRequest };
}

describe('HTTP', () => {
  const { fakeRequests } = mockHttp();

  afterEach(() => {
    fakeRequests.length = 0;
  });

  it('HTTP get() method works correctly', () => {
    const http = new HTTP('');

    http.get<void>('/test', { data: { alfa: 'beta' } });

    expect(fakeRequests.length).to.eq(1);
    expect(fakeRequests[0].method).to.eq('GET');
    expect(fakeRequests[0].url).to.eq(`${BASE_URL}/test?alfa=beta`);
    expect(fakeRequests[0].requestBody).to.eq(undefined);
  });

  it('HTTP post() method works correctly', () => {
    const http = new HTTP('');

    http.post<void>('/test', { data: { alfa: 'beta' } });

    expect(fakeRequests.length).to.eq(1);
    expect(fakeRequests[0].method).to.eq('POST');
    expect(fakeRequests[0].url).to.eq(`${BASE_URL}/test`);
    expect(fakeRequests[0].requestBody).to.eq('{"alfa":"beta"}');
  });

  it('HTTP put() method works correctly', () => {
    const http = new HTTP('');

    http.put<void>('/test', { data: { alfa: 'beta' } });

    expect(fakeRequests.length).to.eq(1);
    expect(fakeRequests[0].method).to.eq('PUT');
    expect(fakeRequests[0].url).to.eq(`${BASE_URL}/test`);
    expect(fakeRequests[0].requestBody).to.eq('{"alfa":"beta"}');
  });

  it('HTTP delete() method works correctly', () => {
    const http = new HTTP('');

    http.delete<void>('/test', { data: { alfa: 'beta' } });

    expect(fakeRequests.length).to.eq(1);
    expect(fakeRequests[0].method).to.eq('DELETE');
    expect(fakeRequests[0].url).to.eq(`${BASE_URL}/test`);
    expect(fakeRequests[0].requestBody).to.eq('{"alfa":"beta"}');
  });
});
