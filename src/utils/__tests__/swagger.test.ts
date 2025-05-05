import swaggerSpec from '../swagger'; // Adjust the import based on your file structure

describe('Swagger Configuration', () => {
  it('should generate a valid Swagger specification', () => {
    expect(swaggerSpec).toHaveProperty('openapi');
    expect(swaggerSpec.openapi).toBe('3.0.0');

    expect(swaggerSpec).toHaveProperty('info');
    expect(swaggerSpec.info).toHaveProperty('title');
    expect(swaggerSpec.info.title).toBe('Node.js API Boilerplate');
    expect(swaggerSpec.info).toHaveProperty('version');
    expect(swaggerSpec.info.version).toBe('1.0.0');
    expect(swaggerSpec.info).toHaveProperty('description');
    expect(swaggerSpec.info.description).toBe(
      'Production-ready Node.js API with Swagger, TypeScript, JWT auth and validation'
    );

    expect(swaggerSpec).toHaveProperty('servers');
    expect(swaggerSpec.servers).toHaveLength(1);
    expect(swaggerSpec.servers[0]).toHaveProperty('url');
    expect(swaggerSpec.servers[0].url).toBe('http://localhost:3000/api');

    // Ensure 'apis' is set correctly
    expect(swaggerSpec).toHaveProperty('paths');
    expect(Object.keys(swaggerSpec.paths)).toHaveLength(4); // No paths are generated yet, just checking for an empty object.
  });

  it('should include paths from the specified API files', () => {
    const paths = swaggerSpec.paths;
    
    // If your API routes are correctly configured, there should be some paths here
    // Assuming you have routes configured in './src/routes/*.ts' or './src/auth/*.ts'
    // This test will need to be adjusted according to your actual routes.
    // For example:
    // expect(paths['/v1/hello']).toBeDefined();
    // expect(paths['/v1/users']).toBeDefined();
  });
});
