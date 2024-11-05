export interface NewableClass<T> {
  new (...args: any[]): T;
}
