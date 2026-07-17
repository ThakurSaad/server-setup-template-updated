// http-status v2 publishes ESM-only type declarations, which a CommonJS
// build cannot `import` directly (TS1479). Its runtime CJS entry exposes
// the same `status` object, so we re-export it here with number-typed
// values (the upstream literal types make e.g. BAD_REQUEST unusable as a
// general status code).
const { status } = require("http-status") as {
  status: {
    [
      K in keyof typeof import("http-status", {
        with: { "resolution-mode": "import" },
      }).status
    ]: number;
  };
};

export { status };
