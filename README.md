Modern Snow is a Next.js App Router app that visualizes NOAA forecast data as an interactive snowfall/precipitation outlook for Mt. Bachelor (Bend, Oregon).

https://modern-snow.vercel.app

## What It Does

- Pulls the latest forecast grid data from the NOAA Weather.gov API.
- Builds a time-series of forecast “windows” (snowfall, total precip, and precip probability).
- Highlights “bluebird” windows (fresh snow with little-to-no precip) and flags precipitation concerns (rain risk, light precip, or snow ongoing).
- Renders an interactive bar chart with tooltips that work across the full column hover area.

## Tech Stack

- Next.js (App Router) + React
- TypeScript
- MUI (Material UI) for layout/styling
- MUI X Charts for the forecast bar chart + tooltip
- `dayjs` for time formatting

## Project Structure

- `src/app/layout.tsx` — global layout, theme wiring, and global styles
- `src/app/page.tsx` — landing page shell + suspense boundary for the forecast
- `src/components/SnowForecast.tsx` — server component that loads NOAA data and streams the client chart
- `src/components/CustomChart.tsx` — client chart UI (warnings, bands, tooltip, chart config)
- `src/data/getWeatherData.tsx` — server-side fetch + normalization of NOAA forecast data (explicit cache revalidation and required `user-agent`)

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

### Useful Commands

```bash
npm run lint
npm run build
npm run start
```

## Data Source & Location

The forecast is fetched from the NOAA Weather.gov gridpoint endpoint configured in `src/data/getWeatherData.tsx`.

- To change the forecast area, update the gridpoint in the `fetch()` URL.
- Weather.gov requests require a descriptive `User-Agent`; this project sets one in the request headers.
- Fetch caching is explicit via `next: { revalidate: 10 }` so the UI stays fresh without hammering the API.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the app shell in `src/app/page.tsx` (and global layout/styles in `src/app/layout.tsx` + `src/app/globals.css`).

## Commands

```bash
npm run dev   # start local server
npm run lint  # eslint checks
npm run build # production build
npm run start # serve production build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
