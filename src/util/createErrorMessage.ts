const createErrorMessage = (message: string, path: string = "") => [
  {
    path,
    message,
  },
];

export = createErrorMessage;
