import logger from '../logger';
import { transports, Logger } from 'winston'; // Import Logger type from 'winston'

// Mock the transports to prevent writing to files or the console during tests
jest.mock('winston', () => ({
  createLogger: jest.fn().mockReturnValue({
    level: 'info',
    format: { json: jest.fn() },
    transports: [
      { log: jest.fn() }, // Mock file transport
      { log: jest.fn() }, // Mock console transport
    ],
    info: jest.fn(),
    error: jest.fn(),
  }),
  transports: {
    File: jest.fn(),
    Console: jest.fn(),
  },
  format: {
    json: jest.fn(),
    simple: jest.fn(),
  },
}));

describe('Logger', () => {
  let loggerInstance: Logger; // Type loggerInstance as Logger from winston

  beforeEach(() => {
    loggerInstance = logger; // Assign the mocked logger
  });

  it('should log info messages', () => {
    const message = 'Info message';
    loggerInstance.info(message);

    // Check if the 'info' method is called with the correct message
    expect(loggerInstance.info).toHaveBeenCalledWith(message);

    // Check if the file and console transports are called
    expect(loggerInstance.transports[0].log).toHaveBeenCalled();
    expect(loggerInstance.transports[1].log).toHaveBeenCalled();
  });

  it('should log error messages', () => {
    const message = 'Error message';
    const error = new Error('Test error');
    loggerInstance.error(message, error);

    // Check if the 'error' method is called with the correct message and error
    expect(loggerInstance.error).toHaveBeenCalledWith(message, error);

    // Check if the file and console transports are called
    expect(loggerInstance.transports[0].log).toHaveBeenCalled();
    expect(loggerInstance.transports[1].log).toHaveBeenCalled();
  });

  it('should log to both transports (console and file)', () => {
    const message = 'Test log message';
    loggerInstance.info(message);

    // Check if the file transport is called (combined.log)
    expect(loggerInstance.transports[0].log).toHaveBeenCalledWith(
      expect.objectContaining({
        message,
        level: 'info',
      })
    );

    // Check if the console transport is called
    expect(loggerInstance.transports[1].log).toHaveBeenCalledWith(
      expect.objectContaining({
        message,
        level: 'info',
      })
    );
  });
});
