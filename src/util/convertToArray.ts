const convertToArray = (data: string | string[]): string[] => {
  return typeof data === "string" ? JSON.parse(data) : data;
};

export = convertToArray;
