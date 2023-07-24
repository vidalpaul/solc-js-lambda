export type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "https://deno.land/x/lambda@1.32.5/mod.ts";

export { wrapper } from "https://deno.land/x/solc@2.1.6/mod.ts";
export type { Input } from "https://deno.land/x/solc@2.1.6/types.ts";
export { download } from "https://deno.land/x/solc@2.1.6/download.ts";
export { createRequire } from "node:module";

export type { LambdaRequest, OutputError } from "./src/types/types.ts";
