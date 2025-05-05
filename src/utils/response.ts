import { ErrorPayload, SuccessPayload } from "../middlewares/responseHandler";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any;
  }
  
  export function successResponse<T>(payload: SuccessPayload): ApiResponse<T> {
    return {
      success: true,
      message: payload.message,
      data: payload.data || {},
    };
  }
  
  export function errorResponse(payload: ErrorPayload): ApiResponse<null> {
    return {
      success: false,
      message: payload.message,
      errors: payload.errors,
    };
  }
  