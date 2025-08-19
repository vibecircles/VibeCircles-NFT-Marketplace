import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

if (!clientId) {
  throw new Error("Client ID not set. Please add NEXT_PUBLIC_TEMPLATE_CLIENT_ID to your .env.local file");
}

export default createThirdwebClient({ clientId });
