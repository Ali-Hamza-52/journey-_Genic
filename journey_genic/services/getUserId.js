import { parseJwt } from "@/utils/jwtParser";
import { cookies } from "next/headers";

export const getUserId = () => {
  const cookie = cookies();
  const token = cookie.get("accessToken");

  if (!token) {
    return undefined; // Handle missing token
  }

  const { role, exp, userId } = parseJwt(token.value); // Use `token.value`
  console.log("userId: " + userId);

  return userId; // Or return `userId` if needed
};
