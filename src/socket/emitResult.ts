const emitResult = ({
  statusCode,
  success,
  message,
  data,
}: {
  statusCode: number;
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}) => {
  return {
    statusCode,
    success,
    message,
    ...(data && { data }),
  };
};

export = emitResult;
