export type ComponentProps = Record<string, unknown>;

export interface Validation {
  pattern: RegExp;
  error: string;
}

export type ValidationMap = Record<string, Validation>;

export interface ValidationOptions {
  triggerOnEmpty?: boolean;
}

export interface FormProps<V = unknown> extends ComponentProps {
  values?: V;
  validation?: ValidationMap;
}

export interface InputProps extends ComponentProps {
  type: string;
  label?: string;
  inputName: string;
  placeholder?: string;
  accept?: string;
  value?: string;
  className?: string;
  pattern?: RegExp;
  error?: string;
}

export enum RouterLink {
  Back = 'Back',
  Forward = 'Forward',
}

export interface LinkProps extends ComponentProps {
  label: string,
  href?: string,
  go?: RouterLink;
  className?: string,
}
