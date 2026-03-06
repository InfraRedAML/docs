export interface OpenAPISpec {
  openapi: string;
  info: { title?: string; description?: string; version?: string };
  servers?: Array<{ url: string; description?: string }>;
  paths: Record<
    string,
    Record<
      string,
      {
        operationId?: string;
        summary?: string;
        description?: string;
        tags?: string[];
        parameters?: unknown[];
        requestBody?: unknown;
        responses?: Record<string, unknown>;
      }
    >
  >;
  components?: Record<string, unknown>;
}

export interface ApiOperation {
  method: string;
  path: string;
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: unknown[];
  requestBody?: unknown;
  responses?: Record<string, unknown>;
}
