/* eslint-disable @typescript-eslint/ban-types */
export interface NewableClass<T> extends Function {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}
