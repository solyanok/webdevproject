export const URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:4040"
    : "https://plain-lapel-mite.cyclic.app";