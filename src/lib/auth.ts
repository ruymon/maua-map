import { AccessArgs, AccessResult } from "payload";

export const isAdmin = ({ req: { user } }: AccessArgs): AccessResult => {
  const userIsAdmin = user && user.role === "admin";
  return Boolean(userIsAdmin);
};
