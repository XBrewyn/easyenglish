type Validation = {
  message?: string;
  regExp?: RegExp;
  emptyErrorMessage?: string;
  isOpcional?: boolean;
};

type Field = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'textarea';
  value?: string;
  validation?: Validation;
};

type FieldForm = Field & {
  validation: Validation & {
    serverErrorMessage: string;
    isNotValid: boolean;
  };
};

type Inputs = {
  [key: string]: Field;
};

type State = {
  [key: string]: FieldForm;
};

export type {
  Field,
  Inputs,
  Validation,
  State,
  FieldForm
};
