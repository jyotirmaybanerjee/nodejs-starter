import { successResponse, errorResponse } from '../response';
import { SuccessPayload, ErrorPayload } from '../../middlewares/responseHandler';

describe('Response Utilities', () => {
  
  describe('successResponse', () => {
    it('should return a success response with message and data', () => {
      const payload: SuccessPayload = {
        message: 'Request was successful',
        data: { id: 1, name: 'John Doe' },
      };
      
      const response = successResponse(payload);

      expect(response.success).toBe(true);
      expect(response.message).toBe(payload.message);
      expect(response.data).toEqual(payload.data);
      expect(response.errors).toBeUndefined();
    });

    it('should return a success response with message but no data', () => {
      const payload: SuccessPayload = {
        message: 'Request was successful',
      };
      
      const response = successResponse(payload);

      expect(response.success).toBe(true);
      expect(response.message).toBe(payload.message);
      expect(response.data).toEqual({});
      expect(response.errors).toBeUndefined();
    });
  });

  describe('errorResponse', () => {
    it('should return an error response with message and errors', () => {
      const payload: ErrorPayload = {
        message: 'Something went wrong',
        errors: { field: 'email', message: 'Invalid email address' },
      };

      const response = errorResponse(payload);

      expect(response.success).toBe(false);
      expect(response.message).toBe(payload.message);
      expect(response.errors).toEqual(payload.errors);
      expect(response.data).toBeUndefined();
    });

    it('should return an error response with only message', () => {
      const payload: ErrorPayload = {
        message: 'Something went wrong',
      };

      const response = errorResponse(payload);

      expect(response.success).toBe(false);
      expect(response.message).toBe(payload.message);
      expect(response.errors).toBeUndefined();
      expect(response.data).toBeUndefined();
    });
  });
});
