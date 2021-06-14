export type ComponentProps = Record<string, unknown>;

export interface Validation {
  pattern: RegExp;
  error: string;
}

export type ValidationMap = Record<string, Validation>;

export interface FormProps<V = unknown> extends ComponentProps {
  values: V;
  validation: ValidationMap;
}
