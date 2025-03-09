import { isEmpty, merge } from "lodash";
import { z, ZodSchema } from "zod";
import { GenericObject, Headers, Options, Response } from "./apiTypes";
import qs from "query-string";

export const objectToQueryString = (obj: GenericObject) => {
  if (isEmpty(obj)) return "";

  const newQsValue = qs.stringify(obj, {
    arrayFormat: "bracket",
    skipEmptyString: true,
    skipNull: true,
  });

  return newQsValue.length ? `?${newQsValue}` : "";
};

export default function createApiClient(baseURL: string, version: "v1") {
  function client<T>(
    endpoint: string,
    config: Options = {},
    method: string,
    schema?: ZodSchema<T>
  ): Promise<T | { error: z.ZodError<T>; data: null; schema: ZodSchema<T> }> {
    const response = { config } as Response<T>;
    const customHeaders: Headers = {
      "Access-Control-Allow-Origin": "*",
    };

    let url = `${baseURL}${version}${endpoint}`;
    let data = config.data;

    if (data && typeof data === "object" && typeof data.append !== "function") {
      data = JSON.stringify(data);
      customHeaders["content-type"] = "application/json";
    }

    if (config.params) {
      url += objectToQueryString(config.params);
    }

    return fetch(url, {
      method,
      body: data,
      headers: merge(config.headers, customHeaders),
    }).then(async (res) => {
      response.data = await res.json();

      if (schema) {
        const validation = schema.safeParse(response.data);

        if (!validation.success) {
          console.log("VALIDATION ERROR", validation.error);

          return {
            schema,
            error: validation.error,
            data: null,
          };
        }
        return validation.data;
      }

      return response.data;
    });
  }

  client.get = <T>(url: string, config?: Options, schema?: ZodSchema<T>) =>
    client<T>(url, config, "GET", schema);

  return client;
}
