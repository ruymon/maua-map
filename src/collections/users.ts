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
  auth: true,
  access: {
    delete: () => false,
    update: () => false,
  },
  fields: [],
};
