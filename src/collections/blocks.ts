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
      type: "text",
      label: {
        pt: "Nome",
      },
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "image",
      label: {
        pt: "Imagem do bloco",
      },
      type: "upload",
      relationTo: "media",
    },
    {
      name: "locations",
      label: {
        pt: "Locais de interesse",
      },
      type: "join",
      collection: "locations",
      on: "block",
    },
  ],
};
