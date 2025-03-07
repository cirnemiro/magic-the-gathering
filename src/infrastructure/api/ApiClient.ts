import createApiClient from "./api";

export const ApiClient = createApiClient(
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "",
  "v1"
);
