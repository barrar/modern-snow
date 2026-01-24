export type ForecastLocationId =
    | 'bachelor'
    | 'timberline'
    | 'mt-hood-meadows'
    | 'mt-hood-skibowl'
    | 'willamette-pass'
    | 'hoodoo'
    | 'anthony-lakes'
    | 'mt-ashland'
    | 'warner-canyon'
    | 'cooper-spur'
    | 'crystal-mountain'
    | 'stevens-pass'
    | 'summit-snoqualmie'
    | 'alpental'
    | 'mount-baker'
    | 'white-pass'
    | 'mission-ridge'
    | 'forty-nine-degrees-north'
    | 'bluewood'
    | 'loup-loup'
    | 'mammoth-mountain'
    | 'palisades-tahoe'
    | 'heavenly'
    | 'northstar'
    | 'kirkwood'
    | 'sierra-at-tahoe'
    | 'sugar-bowl'
    | 'big-bear'
    | 'mountain-high'
    | 'june-mountain'
    | 'park-city'
    | 'deer-valley'
    | 'snowbird'
    | 'alta'
    | 'solitude'
    | 'brighton'
    | 'snowbasin'
    | 'powder-mountain'
    | 'sundance'
    | 'brian-head'
    | 'vail'
    | 'breckenridge'
    | 'keystone'
    | 'beaver-creek'
    | 'aspen-snowmass'
    | 'copper-mountain'
    | 'steamboat'
    | 'winter-park'
    | 'arapahoe-basin'
    | 'telluride'

export type ForecastLocation = {
    id: ForecastLocationId
    label: string
    title: string
    description: string
    gridpoints: { office: string; x: number; y: number }
}

export const forecastLocations: ForecastLocation[] = [
    // Oregon
    {
        id: 'bachelor',
        label: 'Mt. Bachelor',
        title: 'Mt. Bachelor snow forecast',
        description: 'A quick, visual snowfall outlook for Mt. Bachelor in Bend, Oregon',
        gridpoints: { office: 'PDT', x: 23, y: 39 },
    },
    {
        id: 'timberline',
        label: 'Timberline Lodge',
        title: 'Timberline Lodge snow forecast',
        description: 'A quick, visual snowfall outlook for Timberline Lodge in Oregon',
        gridpoints: { office: 'PQR', x: 142, y: 89 },
    },
    {
        id: 'mt-hood-meadows',
        label: 'Mt. Hood Meadows',
        title: 'Mt. Hood Meadows snow forecast',
        description: 'A quick, visual snowfall outlook for Mt. Hood Meadows in Oregon',
        gridpoints: { office: 'PQR', x: 144, y: 88 },
    },
    {
        id: 'mt-hood-skibowl',
        label: 'Mt. Hood Skibowl',
        title: 'Mt. Hood Skibowl snow forecast',
        description: 'A quick, visual snowfall outlook for Mt. Hood Skibowl in Oregon',
        gridpoints: { office: 'PQR', x: 140, y: 88 },
    },
    {
        id: 'willamette-pass',
        label: 'Willamette Pass',
        title: 'Willamette Pass snow forecast',
        description: 'A quick, visual snowfall outlook for Willamette Pass in Oregon',
        gridpoints: { office: 'MFR', x: 145, y: 125 },
    },
    {
        id: 'hoodoo',
        label: 'Hoodoo',
        title: 'Hoodoo snow forecast',
        description: 'A quick, visual snowfall outlook for Hoodoo in Oregon',
        gridpoints: { office: 'PQR', x: 128, y: 48 },
    },
    {
        id: 'anthony-lakes',
        label: 'Anthony Lakes',
        title: 'Anthony Lakes snow forecast',
        description: 'A quick, visual snowfall outlook for Anthony Lakes in Oregon',
        gridpoints: { office: 'PDT', x: 144, y: 64 },
    },
    {
        id: 'mt-ashland',
        label: 'Mt. Ashland',
        title: 'Mt. Ashland snow forecast',
        description: 'A quick, visual snowfall outlook for Mt. Ashland in Oregon',
        gridpoints: { office: 'MFR', x: 108, y: 61 },
    },
    {
        id: 'warner-canyon',
        label: 'Warner Canyon',
        title: 'Warner Canyon snow forecast',
        description: 'A quick, visual snowfall outlook for Warner Canyon in Oregon',
        gridpoints: { office: 'MFR', x: 190, y: 52 },
    },
    {
        id: 'cooper-spur',
        label: 'Cooper Spur',
        title: 'Cooper Spur snow forecast',
        description: 'A quick, visual snowfall outlook for Cooper Spur in Oregon',
        gridpoints: { office: 'PQR', x: 146, y: 92 },
    },
    // Washington
    {
        id: 'crystal-mountain',
        label: 'Crystal Mountain',
        title: 'Crystal Mountain snow forecast',
        description: 'A quick, visual snowfall outlook for Crystal Mountain in Washington',
        gridpoints: { office: 'SEW', x: 145, y: 31 },
    },
    {
        id: 'stevens-pass',
        label: 'Stevens Pass',
        title: 'Stevens Pass snow forecast',
        description: 'A quick, visual snowfall outlook for Stevens Pass in Washington',
        gridpoints: { office: 'SEW', x: 165, y: 67 },
    },
    {
        id: 'summit-snoqualmie',
        label: 'The Summit at Snoqualmie',
        title: 'The Summit at Snoqualmie snow forecast',
        description: 'A quick, visual snowfall outlook for The Summit at Snoqualmie in Washington',
        gridpoints: { office: 'SEW', x: 152, y: 54 },
    },
    {
        id: 'alpental',
        label: 'Alpental',
        title: 'Alpental snow forecast',
        description: 'A quick, visual snowfall outlook for Alpental in Washington',
        gridpoints: { office: 'SEW', x: 152, y: 55 },
    },
    {
        id: 'mount-baker',
        label: 'Mount Baker',
        title: 'Mount Baker snow forecast',
        description: 'A quick, visual snowfall outlook for Mount Baker in Washington',
        gridpoints: { office: 'SEW', x: 158, y: 123 },
    },
    {
        id: 'white-pass',
        label: 'White Pass',
        title: 'White Pass snow forecast',
        description: 'A quick, visual snowfall outlook for White Pass in Washington',
        gridpoints: { office: 'SEW', x: 145, y: 17 },
    },
    {
        id: 'mission-ridge',
        label: 'Mission Ridge',
        title: 'Mission Ridge snow forecast',
        description: 'A quick, visual snowfall outlook for Mission Ridge in Washington',
        gridpoints: { office: 'OTX', x: 43, y: 89 },
    },
    {
        id: 'forty-nine-degrees-north',
        label: '49 Degrees North',
        title: '49 Degrees North snow forecast',
        description: 'A quick, visual snowfall outlook for 49 Degrees North in Washington',
        gridpoints: { office: 'OTX', x: 141, y: 121 },
    },
    {
        id: 'bluewood',
        label: 'Bluewood',
        title: 'Bluewood snow forecast',
        description: 'A quick, visual snowfall outlook for Bluewood in Washington',
        gridpoints: { office: 'PDT', x: 165, y: 113 },
    },
    {
        id: 'loup-loup',
        label: 'Loup Loup',
        title: 'Loup Loup snow forecast',
        description: 'A quick, visual snowfall outlook for Loup Loup in Washington',
        gridpoints: { office: 'OTX', x: 68, y: 138 },
    },
    // California
    {
        id: 'mammoth-mountain',
        label: 'Mammoth Mountain',
        title: 'Mammoth Mountain snow forecast',
        description: 'A quick, visual snowfall outlook for Mammoth Mountain in California',
        gridpoints: { office: 'REV', x: 57, y: 17 },
    },
    {
        id: 'palisades-tahoe',
        label: 'Palisades Tahoe',
        title: 'Palisades Tahoe snow forecast',
        description: 'A quick, visual snowfall outlook for Palisades Tahoe in California',
        gridpoints: { office: 'REV', x: 28, y: 94 },
    },
    {
        id: 'heavenly',
        label: 'Heavenly',
        title: 'Heavenly snow forecast',
        description: 'A quick, visual snowfall outlook for Heavenly in California',
        gridpoints: { office: 'REV', x: 36, y: 81 },
    },
    {
        id: 'northstar',
        label: 'Northstar',
        title: 'Northstar snow forecast',
        description: 'A quick, visual snowfall outlook for Northstar in California',
        gridpoints: { office: 'REV', x: 32, y: 96 },
    },
    {
        id: 'kirkwood',
        label: 'Kirkwood',
        title: 'Kirkwood snow forecast',
        description: 'A quick, visual snowfall outlook for Kirkwood in California',
        gridpoints: { office: 'STO', x: 91, y: 63 },
    },
    {
        id: 'sierra-at-tahoe',
        label: 'Sierra-at-Tahoe',
        title: 'Sierra-at-Tahoe snow forecast',
        description: 'A quick, visual snowfall outlook for Sierra-at-Tahoe in California',
        gridpoints: { office: 'STO', x: 92, y: 69 },
    },
    {
        id: 'sugar-bowl',
        label: 'Sugar Bowl',
        title: 'Sugar Bowl snow forecast',
        description: 'A quick, visual snowfall outlook for Sugar Bowl in California',
        gridpoints: { office: 'STO', x: 87, y: 93 },
    },
    {
        id: 'big-bear',
        label: 'Big Bear Mountain Resort',
        title: 'Big Bear Mountain Resort snow forecast',
        description: 'A quick, visual snowfall outlook for Big Bear Mountain Resort in California',
        gridpoints: { office: 'SGX', x: 78, y: 78 },
    },
    {
        id: 'mountain-high',
        label: 'Mountain High',
        title: 'Mountain High snow forecast',
        description: 'A quick, visual snowfall outlook for Mountain High in California',
        gridpoints: { office: 'LOX', x: 177, y: 56 },
    },
    {
        id: 'june-mountain',
        label: 'June Mountain',
        title: 'June Mountain snow forecast',
        description: 'A quick, visual snowfall outlook for June Mountain in California',
        gridpoints: { office: 'REV', x: 56, y: 24 },
    },
    // Utah
    {
        id: 'park-city',
        label: 'Park City Mountain',
        title: 'Park City Mountain snow forecast',
        description: 'A quick, visual snowfall outlook for Park City Mountain in Utah',
        gridpoints: { office: 'SLC', x: 113, y: 169 },
    },
    {
        id: 'deer-valley',
        label: 'Deer Valley',
        title: 'Deer Valley snow forecast',
        description: 'A quick, visual snowfall outlook for Deer Valley in Utah',
        gridpoints: { office: 'SLC', x: 113, y: 167 },
    },
    {
        id: 'snowbird',
        label: 'Snowbird',
        title: 'Snowbird snow forecast',
        description: 'A quick, visual snowfall outlook for Snowbird in Utah',
        gridpoints: { office: 'SLC', x: 107, y: 166 },
    },
    {
        id: 'alta',
        label: 'Alta',
        title: 'Alta snow forecast',
        description: 'A quick, visual snowfall outlook for Alta in Utah',
        gridpoints: { office: 'SLC', x: 108, y: 166 },
    },
    {
        id: 'solitude',
        label: 'Solitude',
        title: 'Solitude snow forecast',
        description: 'A quick, visual snowfall outlook for Solitude in Utah',
        gridpoints: { office: 'SLC', x: 110, y: 168 },
    },
    {
        id: 'brighton',
        label: 'Brighton',
        title: 'Brighton snow forecast',
        description: 'A quick, visual snowfall outlook for Brighton in Utah',
        gridpoints: { office: 'SLC', x: 110, y: 167 },
    },
    {
        id: 'snowbasin',
        label: 'Snowbasin',
        title: 'Snowbasin snow forecast',
        description: 'A quick, visual snowfall outlook for Snowbasin in Utah',
        gridpoints: { office: 'SLC', x: 104, y: 196 },
    },
    {
        id: 'powder-mountain',
        label: 'Powder Mountain',
        title: 'Powder Mountain snow forecast',
        description: 'A quick, visual snowfall outlook for Powder Mountain in Utah',
        gridpoints: { office: 'SLC', x: 108, y: 203 },
    },
    {
        id: 'sundance',
        label: 'Sundance',
        title: 'Sundance snow forecast',
        description: 'A quick, visual snowfall outlook for Sundance in Utah',
        gridpoints: { office: 'SLC', x: 109, y: 157 },
    },
    {
        id: 'brian-head',
        label: 'Brian Head',
        title: 'Brian Head snow forecast',
        description: 'A quick, visual snowfall outlook for Brian Head in Utah',
        gridpoints: { office: 'SLC', x: 50, y: 42 },
    },
    // Colorado
    {
        id: 'vail',
        label: 'Vail',
        title: 'Vail snow forecast',
        description: 'A quick, visual snowfall outlook for Vail in Colorado',
        gridpoints: { office: 'GJT', x: 174, y: 121 },
    },
    {
        id: 'breckenridge',
        label: 'Breckenridge',
        title: 'Breckenridge snow forecast',
        description: 'A quick, visual snowfall outlook for Breckenridge in Colorado',
        gridpoints: { office: 'BOU', x: 25, y: 53 },
    },
    {
        id: 'keystone',
        label: 'Keystone',
        title: 'Keystone snow forecast',
        description: 'A quick, visual snowfall outlook for Keystone in Colorado',
        gridpoints: { office: 'BOU', x: 29, y: 58 },
    },
    {
        id: 'beaver-creek',
        label: 'Beaver Creek',
        title: 'Beaver Creek snow forecast',
        description: 'A quick, visual snowfall outlook for Beaver Creek in Colorado',
        gridpoints: { office: 'GJT', x: 168, y: 121 },
    },
    {
        id: 'aspen-snowmass',
        label: 'Aspen Snowmass',
        title: 'Aspen Snowmass snow forecast',
        description: 'A quick, visual snowfall outlook for Aspen Snowmass in Colorado',
        gridpoints: { office: 'GJT', x: 152, y: 103 },
    },
    {
        id: 'copper-mountain',
        label: 'Copper Mountain',
        title: 'Copper Mountain snow forecast',
        description: 'A quick, visual snowfall outlook for Copper Mountain in Colorado',
        gridpoints: { office: 'BOU', x: 22, y: 54 },
    },
    {
        id: 'steamboat',
        label: 'Steamboat',
        title: 'Steamboat snow forecast',
        description: 'A quick, visual snowfall outlook for Steamboat in Colorado',
        gridpoints: { office: 'GJT', x: 162, y: 159 },
    },
    {
        id: 'winter-park',
        label: 'Winter Park',
        title: 'Winter Park snow forecast',
        description: 'A quick, visual snowfall outlook for Winter Park in Colorado',
        gridpoints: { office: 'BOU', x: 37, y: 70 },
    },
    {
        id: 'arapahoe-basin',
        label: 'Arapahoe Basin',
        title: 'Arapahoe Basin snow forecast',
        description: 'A quick, visual snowfall outlook for Arapahoe Basin in Colorado',
        gridpoints: { office: 'BOU', x: 32, y: 59 },
    },
    {
        id: 'telluride',
        label: 'Telluride',
        title: 'Telluride snow forecast',
        description: 'A quick, visual snowfall outlook for Telluride in Colorado',
        gridpoints: { office: 'GJT', x: 116, y: 49 },
    },
]

export const defaultLocationId: ForecastLocationId = 'bachelor'

export const getForecastLocation = (id?: string) => {
    const targetId = id ?? defaultLocationId
    return forecastLocations.find((location) => location.id === targetId) ?? forecastLocations[0]
}
