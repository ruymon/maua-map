import { CollectionConfig } from "payload";
import removeAccents from "remove-accents";

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
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.name) {
          data.normalizedName = removeAccents(data.name.toLowerCase());
        }
        return data;
      },
    ],
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
      name: "normalizedName",
      type: "text",
      hidden: true,
      index: true,
    },
    {
      name: "code",
      label: {
        pt: "Código da Sala/local",
      },
      type: "text",
      unique: true,
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
      name: "type",
      label: {
        pt: "Tipo de ponto de interesse",
      },
      type: "select",
      options: [
        {
          label: "Sala de aula",
          value: "classroom",
        },
        {
          label: "Laboratório",
          value: "laboratory",
        },
        {
          label: "Escritório",
          value: "office",
        },
        {
          label: "Banheiro",
          value: "bathroom",
        },
        {
          label: "Almoxarifado",
          value: "storage",
        },
        {
          label: "Cafeteria",
          value: "cafeteria",
        },
        {
          label: "Restaurante",
          value: "restaurant",
        },
        {
          label: "Esportes",
          value: "sports",
        },
        {
          label: "Auditório",
          value: "auditorium",
        },
      ],
      defaultValue: "classroom",
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
