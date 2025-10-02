const EXPOSE_URL = process.env.API_URL || "http://localhost:3000";

export const API_URL = `${EXPOSE_URL}/api`;
export const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8001";
