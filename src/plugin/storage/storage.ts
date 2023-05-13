import type { Readable } from "node:stream";

export abstract class Storage {
  public abstract exists(key: string): Promise<boolean>;
  public abstract read(key: string): Promise<Readable>;
  public abstract write(
    key: string,
    source: Readable | ArrayBuffer
  ): Promise<void>;

  public abstract remove(key: string): Promise<void>;
}
