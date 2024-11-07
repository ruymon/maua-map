import { CollectionConfig } from "payload";

export const RoomsCollection: CollectionConfig = {
  slug: "rooms",
  labels: {
    singular: {
      pt: "Sala",
    },
    plural: {
      pt: "Salas",
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
        pt: "Código da Sala",
      },
      type: "text",
      required: true,
    },
    {
      name: "building",
      label: {
        pt: "Bloco",
      },
      type: "text",
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
      name: "coordinates",
      label: {
        pt: "Coordenadas",
      },
      type: "point",
      required: true,
    },
  ],
};
