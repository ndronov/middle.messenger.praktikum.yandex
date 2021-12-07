declare module '*.pug' {
  const template: (params?: Record<string, unknown>) => string;
  export = template;
}
