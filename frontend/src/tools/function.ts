import { User } from '../global/state/type';
import { Role, Request, RequestOptions, Send } from './type';

const isUser = (user: User | null, role: Role): boolean =>
  !!(user && user.role === role)

const send = ({ token = '', api, data }: Request): Send => {
  const url: string = `http://localhost:3000/api/v1/${api}`;
  const settings: RequestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-auth-token': token } : {}),
      ...(data ? { 'body': JSON.stringify(data) } : {}),
    },
  };

  const request = async (settings: RequestOptions): Promise<Response> => {
    try {
      const response = await fetch(url, settings);
      const responseData: Promise<any> = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  };

  return {
    get: (): Promise<Response> => {
      settings.method = 'GET';
      return request(settings);
    },

    post: (): Promise<Response> => {
      settings.method = 'POST';
      return request(settings);
    },

    delete: (): Promise<Response> => {
      settings.method = 'DELETE';
      return request(settings);
    },

    put: (): Promise<Response> => {
      settings.method = 'PUT';
      return request(settings);
    },
  };
};

const call = (condiction: { [key: string]: () => void }, key: string, defaultValue = null) =>
  typeof condiction[key] === 'function' ? condiction[key]() : defaultValue;

export {
  isUser,
  send,
  call
}