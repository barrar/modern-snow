import { Suspense } from 'react';
import SnowForecast from '../components/SnowForecast';

export default async function Page() {
  return (
    <div className="grow p-10">
      <h1>Mt. Bachelor Snow Forecast</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <SnowForecast />
      </Suspense>
    </div>
  )
}
