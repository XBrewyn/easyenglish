type Role = 'ADMIN' | 'STUDENT';

type Request = {
  token?: string;
  api: string;
  data?: object;
}

type RequestOptions = {
  method: string;
  headers: {
    'x-auth-token'?: string;
    'Content-Type': string;
  };
  body?: string;
}

type Send = {
  get: () => Promise<Response>;
  post: () => Promise<Response>;
  delete: () => Promise<Response>;
  put: () => Promise<Response>;
}

export type {
  Role,
  Request,
  RequestOptions,
  Send
}