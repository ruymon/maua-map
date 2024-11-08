import { isAdmin } from "@/lib/auth";
import { CollectionConfig } from "payload";

export const UsersCollection: CollectionConfig = {
  slug: "users",
  labels: {
    singular: {
      pt: "Usuário",
    },
    plural: {
      pt: "Usuários",
    },
  },
  admin: {
    hidden: ({ user }) => {
      return user && user.role === "user";
    },
  },
  auth: {
    loginWithUsername: true,
  },
  access: {
    create: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: "role",
      label: {
        pt: "Nível de acesso",
      },
      type: "select",
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Usuário", value: "user" },
      ],
      defaultValue: "user",
    },
  ],
};
