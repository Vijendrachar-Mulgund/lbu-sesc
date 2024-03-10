import { Response } from 'express';

export const restError = (
  res: Response,
  error: Error,
  statusCode: number = 400,
) => {
  return res.status(statusCode).json({
    status: 'error',
    message:
      error.message || 'Something went wrong! Please try again later. ☹️',
  });
};
