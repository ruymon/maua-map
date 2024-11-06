import { CollectionConfig } from "payload";

export const MediaCollection: CollectionConfig = {
  slug: "media",
  upload: true,
  labels: {
    singular: {
      pt: 'Mídia',
    },
    plural: {
      pt: 'Mídias',
    },
  },
  fields: [
    {
      name: "description",
      label: {
        pt: "Descrição",
      },
      type: "text",
    },
  ],
};
