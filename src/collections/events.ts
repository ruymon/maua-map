import { CollectionConfig } from "payload";

export const EventsCollection: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "name",
  },
  labels: {
    singular: {
      pt: 'Evento',
    },
    plural: {
      pt: 'Eventos',
    },
  },
  fields: [
    {
      name: "name",
      label: {
        pt: "Nome",
      },
      type: "text",
    },
    // {
    //   name: 'slug',
    //   type: 'text',
    //   hooks: {
    //     beforeChange: [formatSlug],
    //   },
    //   admin: {
    //     readOnly: true,
    //   },
    // },
    {
      name: "banner",
      label: {
        pt: "Banner",
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
    },
    {
      name: "endTime",
      label: {
        pt: "Hora de término",
      },
      type: "date",
    },
  ],
};
