export type KeyOf<T, U> = keyof {
  [P in keyof T as T[P] extends U ? P : never]: any;
};
