export interface SwaggerSpec {
      openapi: string;
      info: {
        title: string;
        version: string;
        description: string;
      };
      servers: { url: string }[];
      paths: Record<string, unknown>;
    }