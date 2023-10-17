import useHttpClient from "./useHttpClient";
import HttpClient from '../libs/httpClient';

describe('useHttpClient hook', () => {
  it('Get method of HttpClient instance should be called', async () => {
    const httpClientGetMock = jest.spyOn(HttpClient.prototype, 'get').mockImplementation(() => {
      return Promise.resolve();
    });
    const options = {headers: { "Authorization": 'token' }};
    const { get } = useHttpClient();

    await get('test-url', options);

    expect(httpClientGetMock).toHaveBeenCalledWith('test-url', options);
    expect(httpClientGetMock).toHaveBeenCalledTimes(1);
  });

  it('should throw an error', async () => {
    jest.spyOn(HttpClient.prototype, 'get').mockImplementation(() => {
      return Promise.reject(new Error('Error message'));
    });
    
    const { get } = useHttpClient();

    await expect(get('test-url')).rejects.toBe('Error message');
  });
});