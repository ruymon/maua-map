import { CollectionConfig } from "payload";

export const EventActivitiesCollection: CollectionConfig = {
  slug: "event-activities",
  admin: {
    useAsTitle: "name",
  },
  labels: {
    singular: {
      pt: 'Atividade do evento',
    },
    plural: {
      pt: 'Atividades do evento',
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: {
        pt: "Nome",
      },
    },
    {
      name: "eventId",
      type: "relationship",
      relationTo: "events",
      label: {
        pt: "Evento",
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
      name: "startTime",
      type: "date",
      label: {
        pt: "Hora de início",
      },
    },
    {
      name: "endTime",
      type: "date",
      label: {
        pt: "Hora de término",
    }
  }
  ]
}
