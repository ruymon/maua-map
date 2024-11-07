import { CollectionConfig } from "payload";

export const EventsCollection: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "name",
  },
  labels: {
    singular: {
      pt: "Evento",
    },
    plural: {
      pt: "Eventos",
    },
  },
  fields: [
    {
      name: "name",
      label: {
        pt: "Nome do evento",
      },
      type: "text",
    },
    {
      name: "banner",
      label: {
        pt: "Banner do evento",
      },
      type: "upload",
      relationTo: "media",
    },
    {
      name: "description",
      label: {
        pt: "Descrição",
      },
      type: "text",
    },
    {
      name: "startTime",
      label: {
        pt: "Hora de início",
      },
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "endTime",
      label: {
        pt: "Hora de término",
      },
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "activities",
      type: "array",
      label: {
        pt: "Atividades do evento",
      },
      labels: {
        singular: {
          pt: "Atividade",
        },
        plural: {
          pt: "Atividades",
        },
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: {
            pt: "Nome da atividade",
          },
        },
        {
          name: "description",
          type: "textarea",
          label: {
            pt: "Descrição",
          },
        },
        {
          name: "room",
          label: {
            pt: "Sala",
          },
          type: "relationship",
          relationTo: "rooms",
        },
        {
          name: "startTime",
          type: "date",
          label: {
            pt: "Hora de início",
          },
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
            },
          },
        },
        {
          name: "endTime",
          type: "date",
          label: {
            pt: "Hora de término",
          },
          admin: {
            date: {
              pickerAppearance: "dayAndTime",
            },
          },
        },
      ],
    },
  ],
};
