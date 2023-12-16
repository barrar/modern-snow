'use client'
import { BarChart } from "@mui/x-charts";

const SnowForecast = ({ data }: { data: any }) => {

    // dayjs().format()

    return (

        <BarChart
            xAxis={[
                {
                    label: 'Day / Time',
                    data: data.dates,
                    scaleType: 'band'
                },
            ]}
            series={[
                {
                    data: data.values,
                },
            ]}
            yAxis={[
                {
                    label: 'Inches',
                },
            ]}

            height={400}
        />
    )
}

export default SnowForecast;