const deleteFalsyField = (obj) => {
  for (const key in obj) if (!obj[key]) delete obj[key];
  return obj;
};

module.exports = deleteFalsyField;
