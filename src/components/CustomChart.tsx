'use client'

import { Box, Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import type { LabelProps, TooltipContentProps } from 'recharts'
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    LabelList,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { chartColors, surfaceGradient, tooltipGradient } from '../data/chartStyles'
import type { ForecastPoint } from '../data/getWeatherData'

const panelSx = {
    p: 3,
    background: surfaceGradient,
    boxShadow: '0 18px 48px rgba(6, 12, 28, 0.4)',
}

const chartPanelSx = {
    p: { xs: 2.5, md: 3.5 },
    background: surfaceGradient,
    boxShadow: '0 24px 60px rgba(6, 12, 28, 0.45)',
}

const warningTone = (point: ForecastPoint) => {
    if (point.alert === 'rain') return { label: 'Rain risk', color: 'error' as const }
    if (point.alert === 'light-precip') return { label: 'Light precip', color: 'warning' as const }
    if (point.alert === 'snow-ongoing') return { label: 'Snow ongoing', color: 'secondary' as const }
    if (point.isBluebird) return { label: 'Bluebird', color: 'info' as const }
    return null
}

const renderSnowLabel = ({ x, y, width, value }: LabelProps) => {
    if (value == null) return null
    const numeric = typeof value === 'number' ? value : Number(value)
    if (!Number.isFinite(numeric) || numeric === 0) return null
    if (typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number') return null

    return (
        <text
            x={x + width / 2}
            y={y - 6}
            textAnchor="middle"
            fill="#e5edff"
            fontSize={12}
            fontWeight={700}>
            {numeric}
        </text>
    )
}

type ForecastTooltipProps = TooltipContentProps<number, string> & {
    points: ForecastPoint[]
}

const ForecastTooltip = ({ active, payload, activeIndex, points }: ForecastTooltipProps) => {
    if (!active) return null
    const payloadPoint = payload?.[0]?.payload as ForecastPoint | undefined
    const fallbackPoint = typeof activeIndex === 'number' ? points[activeIndex] : undefined
    const point = payloadPoint ?? fallbackPoint
    if (!point) return null
    const tone = warningTone(point)
    const precipDotColor = point.precipitationType === 'rain'
        ? chartColors.alertRain
        : point.precipitationType === 'snow'
            ? chartColors.snow
            : chartColors.alertDefault

    const MetricRow = ({ label, value, color }: { label: string; value: React.ReactNode; color: string }) => (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                <Box
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: color,
                        boxShadow: '0 0 8px rgba(15, 23, 42, 0.45)',
                    }}
                />
                <Typography variant="body2" color="text.secondary">{label}</Typography>
            </Stack>
            <Typography variant="subtitle1" fontWeight={700}>{value}</Typography>
        </Stack>
    )

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.25,
                minWidth: 220,
                backdropFilter: 'blur(14px)',
                background: tooltipGradient,
                boxShadow: '0 22px 60px rgba(4, 6, 18, 0.55)',
            }}>
            <Stack spacing={1.25}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                    <Typography variant="subtitle1" fontWeight={700}>
                        {point.time}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        {point.isBluebird && (
                            <Chip size="small" label="Bluebird" color="primary" variant="outlined" />
                        )}
                        {tone && (
                            <Chip size="small" label={tone.label} color={tone.color} variant="filled" />
                        )}
                    </Stack>
                </Stack>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
                <Stack spacing={0.75}>
                    <MetricRow
                        label="Snow"
                        value={`${point.inches ?? 0}"`}
                        color={chartColors.snow}
                    />
                    <MetricRow
                        label="Precip"
                        value={`${point.precipInches ?? 0}"`}
                        color={precipDotColor}
                    />
                    {point.precipProbability != null && (
                        <MetricRow
                            label="Rain chance"
                            value={`${point.precipProbability}%`}
                            color={chartColors.precipProbability}
                        />
                    )}
                    {point.temperatureF != null && (
                        <MetricRow
                            label="Temperature"
                            value={`${Math.round(point.temperatureF)}°F`}
                            color={chartColors.temperature}
                        />
                    )}
                    {point.windMph != null && (
                        <MetricRow
                            label="Wind"
                            value={`${point.windMph} mph`}
                            color={chartColors.wind}
                        />
                    )}
                    {point.cloudCover != null && (
                        <MetricRow
                            label="Cloud cover"
                            value={`${point.cloudCover}%`}
                            color={chartColors.cloud}
                        />
                    )}
                </Stack>
            </Stack>
        </Paper>
    )
}

export default function CustomChart({ data }: { data: ForecastPoint[] }) {
    const bluebirdWindows = data.filter((point) => point.isBluebird)
    const warningMap = new Map<NonNullable<ForecastPoint['alert']>, {
        alert: NonNullable<ForecastPoint['alert']>
        startIndex: number
        endIndex: number
        startLabel: string
        endLabel: string
    }>()

    data.forEach((point, idx) => {
        if (!point.alert) return
        const existing = warningMap.get(point.alert)
        if (!existing) {
            warningMap.set(point.alert, {
                alert: point.alert,
                startIndex: idx,
                endIndex: idx,
                startLabel: point.time,
                endLabel: point.time,
            })
            return
        }
        if (idx < existing.startIndex) {
            existing.startIndex = idx
            existing.startLabel = point.time
        }
        if (idx > existing.endIndex) {
            existing.endIndex = idx
            existing.endLabel = point.time
        }
    })

    const consolidatedWarnings = Array.from(warningMap.values())
        .sort((a, b) => a.startIndex - b.startIndex)

    const alertDotColor = (alert: ForecastPoint['alert']) => {
        if (alert === 'rain') return chartColors.alertRain
        if (alert === 'light-precip') return chartColors.alertLight
        if (alert === 'snow-ongoing') return chartColors.alertSnow
        return chartColors.alertDefault
    }

    const rainBands = (() => {
        const bands: { start: number; end: number }[] = []
        let current: { start: number; end: number } | null = null

        data.forEach((point, idx) => {
            if (point.alert === 'rain') {
                if (!current) {
                    current = { start: idx, end: idx }
                    bands.push(current)
                } else {
                    current.end = idx
                }
            } else {
                current = null
            }
        })

        return bands
    })()

    const chartData = data.map((point) => {
        const hasMeaningfulPrecip = (point.precipInches ?? 0) > 0.02
        const isRain = point.precipitationType === 'rain'
        const showRainChance = isRain && hasMeaningfulPrecip
        const probabilityValue = point.precipProbability ?? 0
        const adjustedProbability = showRainChance ? probabilityValue : 0
        const chartProbability = showRainChance && point.precipProbability != null
            ? point.precipProbability
            : null

        return {
            ...point,
            precipProbability: adjustedProbability,
            precipProbabilityChart: chartProbability,
        }
    })

    const weatherSeries = [
        { id: 'temperature', label: 'Temp (°F)', color: chartColors.temperature },
        { id: 'wind', label: 'Wind (mph)', color: chartColors.wind },
        { id: 'cloud', label: 'Cloud cover (%)', color: chartColors.cloud },
        { id: 'precip-prob', label: 'Rain chance (%)', color: chartColors.precipProbability },
    ] as const

    const legendItems = [
        { id: 'snowfall', label: 'Snow (in)', color: chartColors.snow },
        ...weatherSeries.map(({ id, label, color }) => ({ id, label, color })),
    ]

    return (
        <Stack spacing={3}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={0}
                        sx={panelSx}>
                        <Stack spacing={1.5}>
                            <Typography variant="subtitle2" color="text.secondary" fontWeight={700}>
                                Bluebird windows
                            </Typography>
                            {bluebirdWindows.length ? (
                                <Stack direction="row" flexWrap="wrap" gap={1}>
                                    {bluebirdWindows.map((point) => (
                                        <Chip
                                            key={point.startTime}
                                            label={`${point.time}${point.alert === 'light-precip' ? ' · light precip' : ''}`}
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                            sx={{ color: '#dbeafe' }}
                                        />
                                    ))}
                                </Stack>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No bluebird windows in this range yet.
                                </Typography>
                            )}
                        </Stack>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={0}
                        sx={panelSx}>
                        <Stack spacing={1.5}>
                            <Typography variant="subtitle2" color="text.secondary" fontWeight={700}>
                                Warnings
                            </Typography>
                            {consolidatedWarnings.length ? (
                                <Stack spacing={1}>
                                    {consolidatedWarnings.map((warning) => (
                                        <Stack
                                            key={warning.alert}
                                            direction="row"
                                            spacing={1.5}
                                            alignItems="flex-start">
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    mt: 0.75,
                                                    backgroundColor: alertDotColor(warning.alert),
                                                }}
                                            />
                                            <Box>
                                                <Typography variant="body2" fontWeight={700}>
                                                    {warning.startLabel === warning.endLabel
                                                        ? warning.startLabel
                                                        : `${warning.startLabel} - ${warning.endLabel}`}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    ))}
                                </Stack>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No precipitation concerns.
                                </Typography>
                            )}
                            <Typography variant="caption" color="text.secondary">
                                Any rain is flagged. Tiny precip amounts are allowed for bluebird calls but still warned.
                            </Typography>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <Paper
                elevation={0}
                sx={chartPanelSx}>


                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                    <Stack sx={{ mb: 1 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
                            <Typography variant="h5">Snowfall outlook</Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                            Bars show expected snowfall, lines show temperature, wind, and cloud cover.
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="flex-end">
                        {legendItems.map((series) => (
                            <Stack key={series.id} direction="row" spacing={0.75} alignItems="center">
                                <Box sx={{ width: 10, height: 10, backgroundColor: series.color }} />
                                <Typography variant="caption">
                                    {series.label}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>

                <Box sx={{ position: 'relative', height: 520, minHeight: 520, minWidth: 0, width: '100%' }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 24,
                            bottom: 32,
                            left: 12,
                            right: 36,
                            pointerEvents: 'none',
                            overflow: 'hidden',
                        }}>
                        {rainBands.map((band, idx) => {
                            const left = (band.start / chartData.length) * 100
                            const width = ((band.end - band.start + 1) / chartData.length) * 100
                            return (
                                <Box
                                    key={`rain-band-${band.start}-${band.end}-${idx}`}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        left: `${left}%`,
                                        width: `${width}%`,
                                        background: chartColors.rainBand.fill,
                                        backdropFilter: 'blur(2px)',
                                        borderLeft: `1px solid ${chartColors.rainBand.borderLeft}`,
                                        borderRight: `1px solid ${chartColors.rainBand.borderRight}`,
                                    }}
                                />
                            )
                        })}
                    </Box>
                    <ResponsiveContainer width="100%" height={520} minHeight={520} minWidth={320}>
                        <ComposedChart
                            data={chartData}
                            margin={{ top: 24, right: 36, bottom: 32, left: 36 }}
                            barGap={-16}
                            barCategoryGap="30%"
                        >
                            <CartesianGrid
                                vertical={false}
                                stroke="rgba(203, 213, 245, 0.18)"
                                strokeDasharray="4 6"
                            />
                            <XAxis
                                dataKey="time"
                                interval={0}
                                tick={{ fill: '#d7e3ff', fontSize: 12, fontWeight: 600 }}
                                axisLine={{ stroke: 'rgba(203, 213, 245, 0.35)' }}
                                tickLine={{ stroke: 'rgba(203, 213, 245, 0.35)' }}
                            />
                            <YAxis
                                yAxisId="snow"
                                hide
                                domain={[0, 'auto']}
                            />
                            <YAxis
                                yAxisId="weather"
                                orientation="left"
                                width={56}
                                tickMargin={10}
                                domain={[0, 100]}
                                allowDataOverflow
                                tick={{ fill: '#cbd5f5', fontSize: 12 }}
                                axisLine={{ stroke: 'rgba(203, 213, 245, 0.35)' }}
                                tickLine={{ stroke: 'rgba(203, 213, 245, 0.35)' }}
                                label={{
                                    value: 'Temp / Wind / Cloud',
                                    angle: -90,
                                    position: 'insideLeft',
                                    fill: '#cbd5f5',
                                    fontSize: 12,
                                }}
                            />
                            <Tooltip<number, string>
                                content={(props) => (
                                    <ForecastTooltip {...props} points={chartData} />
                                )}
                                cursor={{ stroke: 'rgba(219, 231, 255, 0.25)' }}
                                filterNull={false}
                                shared
                                wrapperStyle={{ outline: 'none' }}
                            />
                            <Bar
                                yAxisId="snow"
                                dataKey="inches"
                                name="Snow (in)"
                                fill={chartColors.snow}
                                barSize={22}
                            >
                                <LabelList dataKey="inches" content={renderSnowLabel} />
                            </Bar>
                            <Bar
                                yAxisId="weather"
                                dataKey="precipProbabilityChart"
                                name="Rain chance (%)"
                                fill={chartColors.precipProbability}
                                barSize={10}
                            />
                            <Line
                                yAxisId="weather"
                                type="linear"
                                dataKey="temperatureF"
                                name="Temp (°F)"
                                stroke={chartColors.temperature}
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                yAxisId="weather"
                                type="linear"
                                dataKey="windMph"
                                name="Wind (mph)"
                                stroke={chartColors.wind}
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                yAxisId="weather"
                                type="linear"
                                dataKey="cloudCover"
                                name="Cloud cover (%)"
                                stroke={chartColors.cloud}
                                strokeWidth={2}
                                dot={false}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>
        </Stack>
    )
}
