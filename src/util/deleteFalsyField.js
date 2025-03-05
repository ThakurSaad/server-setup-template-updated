const deleteFalsyField = (obj) => {
  for (key in obj) if (!obj[key]) delete obj[key];
  return obj;
};

module.exports = deleteFalsyField;
