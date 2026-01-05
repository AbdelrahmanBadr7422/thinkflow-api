let requiredEnv = ["MONGO_URI", "JWT_SECRET"];
if (process.env.NODE_ENV === "production") {
  requiredEnv = ["MONGO_URI", "JWT_SECRET", "FRONTEND_URL", "API_URL"];
}
let missingVars: string[] = [];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    missingVars.push(key);
  }
});

if (missingVars.length > 0) {
  throw new Error(
    `Missing environment variables: ${missingVars.join(", ")}\n` +
      `Please check your .env file.`
  );
}

console.log("Environment variables checked successfully");
