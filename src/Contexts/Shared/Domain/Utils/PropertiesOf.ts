type Methods<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? P : never;
}[keyof T];

type MethodsAndProperties<T> = { [key in keyof T]: T[key] };

export type PropertiesOf<T> = Omit<MethodsAndProperties<T>, Methods<T>>;
