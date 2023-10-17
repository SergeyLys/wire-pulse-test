import HttpClient from "./httpClient";

const unmockedFetch = global.fetch;
const unmockedConsole = global.console;

describe('HttpClient module', () => {
  const client = new HttpClient();

  beforeEach(() => {
    jest.resetAllMocks();
  })

  beforeAll(() => {
    global.console.error = jest.fn();
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
    global.console.error = unmockedConsole.error;
  });

  it('should throw an error if baseURL is not provided', async () => {
    try {
      await client.get('/ping');
    } catch(e: any) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e.message).toBe('HttpClient baseURL is not provided');
    }
  })

  it('should return resolved promise from get request', async () => {
    //@ts-ignore
    global.fetch = () => Promise.resolve({json: () => Promise.resolve('pong')});

    client.baseUrl = 'http://127.0.0.1:5174';

    await expect(client.get('/ping')).resolves.toBe('pong');
  });
  
  it('should show an error if something went wrong', async () => {
    //@ts-ignore
    global.fetch = () => Promise.reject('Something went wrong');

    client.baseUrl = 'http://127.0.0.1:5174';

    await expect(client.get('/ping')).rejects.toBe('Something went wrong');
  });
});