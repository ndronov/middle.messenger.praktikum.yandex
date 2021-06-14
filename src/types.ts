export interface Validation {
  pattern: RegExp;
  error: string;
}

export type ValidationMap = Record<string, Validation>;
