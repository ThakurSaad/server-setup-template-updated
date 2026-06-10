const deleteFalsyField = (
  obj: Record<string, unknown>,
): Record<string, unknown> => {
  for (const key in obj) if (!obj[key]) delete obj[key];
  return obj;
};

export = deleteFalsyField;
