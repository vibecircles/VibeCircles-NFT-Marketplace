import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("Client ID not set. Please add NEXT_PUBLIC_THIRDWEB_CLIENT_ID to your .env.local file");
}

// Frontend (safe) - uses clientId for browser-side operations
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export default client;
