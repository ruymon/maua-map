import { CollectionConfig } from "payload";

export const LocationsCollection: CollectionConfig = {
  slug: "locations",
  labels: {
    singular: {
      pt: "Local de interesse",
    },
    plural: {
      pt: "Locais de interesse",
    },
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: {
        pt: "Nome",
      },
      type: "text",
      required: true,
    },
    {
      name: "code",
      label: {
        pt: "Código da Sala/local",
      },
      type: "text",
      required: true,
    },
    {
      name: "block",
      label: {
        pt: "Bloco",
      },
      type: "relationship",
      relationTo: "block",
      required: true,
    },
    {
      name: "floor",
      label: {
        pt: "Andar",
      },
      type: "text",
      required: true,
    },
    {
      name: "referenceNode",
      label: {
        pt: "Nó de referência",
      },
      type: "relationship",
      relationTo: "nodes",
    },
  ],
};
