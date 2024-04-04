import { Request, RequestOptions, Send } from './type';

const send = ({ token = '', api, data }: Request): Send => {
  const url: string = `https://pbdmqnx9-8080.use2.devtunnels.ms/${api}/`;
  const settings: RequestOptions = {
    headers: {
      'Content-Type': 'application/json',
      // Remove 'body' key from headers
      // ...(data ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    // Set default method to 'GET'
    method: 'GET',
    // Add 'body' property if data is provided
    ...(data ? { body: JSON.stringify(data) } : {}),
  };

  const request = async (settings: RequestOptions): Promise<Response> => {
    try {
      const response = await fetch(url, settings);
      const responseData: any = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
      // Throw error object instead of creating a new Error instance
      throw error;
    }
  };

  return {
    get: (): Promise<Response> => {
      // Set method to 'GET' for each request
      settings.method = 'GET';
      return request(settings);
    },

    post: (): Promise<Response> => {
      // Set method to 'POST' for each request
      settings.method = 'POST';
      return request(settings);
    },

    delete: (): Promise<Response> => {
      // Set method to 'DELETE' for each request
      settings.method = 'DELETE';
      return request(settings);
    },

    put: (): Promise<Response> => {
      // Set method to 'PUT' for each request
      settings.method = 'PUT';
      return request(settings);
    },
  };
};

const call = (condiction: { [key: string]: () => void }, key: string, defaultValue = null): any =>
  typeof condiction[key] === 'function' ? condiction[key]() : defaultValue;

export {
  send,
  call,
}