export default class HttpClient {
  private baseURL: string | null;
  
  constructor() {
    this.baseURL = null;
  }

  set baseUrl(url: string) {
    this.baseURL = url;
  }

  async get<T>(endpoint: string, options?: Record<string, any>): Promise<T> {
    if (!this.baseURL) throw new Error('HttpClient baseURL is not provided');

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, options);
      return response.json();
    } catch (error: any) {
      console.error(`GET Error: ${error.message}`);
      throw error;
    }
  }
}

