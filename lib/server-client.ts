import { createThirdwebClient } from "thirdweb";

const secretKey = process.env.TW_SECRET_KEY;

if (!secretKey) {
  throw new Error("Secret key not set. Please add TW_SECRET_KEY to your environment variables");
}

// Backend (API routes / server actions) - uses secretKey for server-side operations
const serverClient = createThirdwebClient({
  secretKey: process.env.TW_SECRET_KEY!,
});

export default serverClient;
