const codeGenerator = (time: number) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiredAt = Date.now() + time * 60 * 1000;
  return { code, expiredAt };
};

export = codeGenerator;
