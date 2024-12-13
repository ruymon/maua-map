import { CollectionConfig } from "payload";

export const NodesCollection: CollectionConfig = {
  slug: "nodes",
  admin: {
    group: "Grafo",
  },
  access: { read: () => true },
  labels: {
    singular: {
      pt: "Nó",
    },
    plural: {
      pt: "Nós",
    },
  },
  fields: [
    {
      name: "coordinates",
      label: {
        pt: "Coordenadas",
      },
      type: "point",
      index: true,
      unique: true,
      required: true,
    },
  ],
};
