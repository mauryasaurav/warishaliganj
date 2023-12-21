import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.JWT_PRIVATE_KEY);
    return decoded;
  } catch (error) {
    // If the token is invalid or expired, you can handle the error as needed
    console.error("Error verifying token:", error.message);
    return null;
  }
};

export const calculateProductPercentage = ({
  originalAmount,
  discountAmount,
}) => {
  const discountPercentage =
    ((originalAmount - discountAmount) / originalAmount) * 100;

  return discountPercentage.toFixed(2);
};
