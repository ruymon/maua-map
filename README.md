## Mauá Map Tracker

A simple Next.js webapp to help users locate themselves around campus.

Learn more about the new features being used:

- [`dynamicIO`](https://nextjs.org/docs/canary/app/api-reference/next-config-js/dynamicIO)
- [`use cache`](https://nextjs.org/docs/canary/app/api-reference/directives/use-cache)

## Getting started

1. Run `npm i` followed by `npm run dev` to install the dependencies and start the development server.

2. Add your API keys to the `.env` file.

- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`: The map is generated using [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/).

3. Navigate to [http://localhost:3000/](http://localhost:3000/) to see the app in action.

> We recommend leaving the [`serverComponentsHRMcache` config option](https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsHmrCache) enabled while developing to reduce API calls between saves. However, we disabled it during the keynote to allow us to refetch data across Fast Refresh.
