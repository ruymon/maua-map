import { CollectionConfig } from "payload";

export const BlockCollection: CollectionConfig = {
  slug: "block",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  labels: {
    singular: {
      pt: "Bloco",
    },
    plural: {
      pt: "Blocos",
    },
  },
  fields: [
    {
      name: "name",
      label: {
        pt: "Nome",
      },
      type: "text",
      unique: true,
      index: true,
    },
  ],
};
