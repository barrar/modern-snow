export type ForecastLocationId = 'bachelor' | 'caribou-kcar' | 'bar-harbor'

export type ForecastLocation = {
    id: ForecastLocationId
    label: string
    title: string
    description: string
    gridpoints: { office: string; x: number; y: number }
}

export const forecastLocations: ForecastLocation[] = [
    {
        id: 'bachelor',
        label: 'Mt. Bachelor',
        title: 'Mt. Bachelor snow forecast',
        description: 'A quick, visual snowfall outlook for Mt. Bachelor in Bend, Oregon',
        gridpoints: { office: 'PDT', x: 23, y: 39 },
    },
    {
        id: 'caribou-kcar',
        label: 'Caribou',
        title: 'Caribou snow forecast',
        description: 'A quick, visual snowfall outlook for Caribou Municipal Airport in Maine',
        gridpoints: { office: 'CAR', x: 71, y: 163 },
    },
    {
        id: 'bar-harbor',
        label: 'Bar Harbor',
        title: 'Bar Harbor snow forecast',
        description: 'A quick, visual snowfall outlook for Bar Harbor, Maine',
        gridpoints: { office: 'CAR', x: 117, y: 69 },
    },
]

export const defaultLocationId: ForecastLocationId = 'bachelor'

export const getForecastLocation = (id?: string) => {
    const targetId = id ?? defaultLocationId
    return forecastLocations.find((location) => location.id === targetId) ?? forecastLocations[0]
}
