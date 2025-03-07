import { UseQueryOptions } from "@tanstack/react-query";

export type GenericObject<T = unknown> = Record<string, T>;

export type Options = {
  headers?: Headers;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  responseType?:
    | "text"
    | "json"
    | "stream"
    | "blob"
    | "arrayBuffer"
    | "formData";
  params?: GenericObject;
};

export type Headers = {
  [name: string]: string;
};

export namespace Api {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type Error = any;
}

export type Response<T> = {
  status: number;
  statusText: string;
  config: Options;
  data: T;
  headers: Headers;
  redirect: boolean;
  url: string;
  type: ResponseType;
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;
};
