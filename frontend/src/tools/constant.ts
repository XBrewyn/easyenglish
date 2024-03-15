import { Role } from './type';

const REGEXP: { [key: string]: RegExp; } = {
  USERNAME: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_NUMBER: /^\+?\d{1,3}[- ]?\(?\d{1,3}\)?[- ]?\d{3,5}[- ]?\d{4}$/,
  NAME: /^([a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\xFF' -]){1,50}$/,
  LAST_NAME: /^([a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\xFF' -]){1,50}$/,
}

const ROLE: { [key: string]: Role; } = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
}

const HTTP_STATUS_CODES: { [key: string]: number; } = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TEMPORARY_REDIRECT: 307,
}

export {
  REGEXP,
  ROLE,
  HTTP_STATUS_CODES
}