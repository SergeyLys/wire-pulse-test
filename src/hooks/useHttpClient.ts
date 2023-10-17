import HttpClient from "../libs/httpClient";

type UseHttpClient = {
  get: <T>(url: string, options?: Record<string, any>) => Promise<T>;
}

const client = new HttpClient();
client.baseUrl = 'http://localhost:5174';

const useHttpClient = (): UseHttpClient => {
  return {
    get: <T>(url: string, options?: Record<string, any>) => client.get<T>(url, options).then(data => data).catch(error => {
      throw error.message;
    })
  }
}

export default useHttpClient;