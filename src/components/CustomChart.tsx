"use client";

import {
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Cloud,
  CloudRain,
  Droplets,
  Snowflake,
  Thermometer,
  Wind,
} from "lucide-react";
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
  type LabelProps,
  type TooltipContentProps,
} from "recharts";
import {
  chartColors,
  surfaceGradient,
  tooltipGradient,
} from "../data/chartStyles";
import type { ForecastPoint } from "../data/getWeatherData";
import type { TimeZoneId } from "../data/timeZones";

const panelSx = {
  p: 3,
  background: surfaceGradient,
  boxShadow: "0 18px 48px rgba(6, 12, 28, 0.4)",
};

const chartPanelSx = {
  p: { xs: 2.5, md: 3.5 },
  background: surfaceGradient,
  boxShadow: "0 24px 60px rgba(6, 12, 28, 0.45)",
};

const rainWarningThreshold = 15;
const rainPrecipThreshold = 0.02;

type ChartPoint = ForecastPoint & {
  timeLabel: string;
  rangeLabel: string;
  dayLabel: string;
  precipProbabilityChart: number | null;
  showRainRisk: boolean;
};

const warningTone = (point: ChartPoint) => {
  if (point.showRainRisk)
    return { label: "Rain risk", color: "error" as const };
  if (point.alert === "light-precip")
    return { label: "Light precip", color: "warning" as const };
  if (point.alert === "snow-ongoing")
    return { label: "Snow ongoing", color: "secondary" as const };
  if (point.isBluebird) return { label: "Bluebird", color: "info" as const };
  return null;
};

const renderSnowLabel = ({ x, y, width, value }: LabelProps) => {
  if (value == null) return null;
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric === 0) return null;
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    typeof width !== "number"
  )
    return null;

  return (
    <text
      x={x + width / 2}
      y={y - 6}
      textAnchor="middle"
      fill="#e5edff"
      fontSize={12}
      fontWeight={700}
    >
      {numeric}
    </text>
  );
};

type ForecastTooltipProps = TooltipContentProps<number, string> & {
  points: ChartPoint[];
};

const ForecastTooltip = ({
  active,
  payload,
  activeIndex,
  points,
}: ForecastTooltipProps) => {
  if (!active) return null;
  const payloadPoint = payload?.[0]?.payload as ChartPoint | undefined;
  const fallbackPoint =
    typeof activeIndex === "number" ? points[activeIndex] : undefined;
  const point = payloadPoint ?? fallbackPoint;
  if (!point) return null;
  const tone = warningTone(point);
  const precipDotColor =
    point.precipitationType === "rain"
      ? chartColors.alertRain
      : point.precipitationType === "snow"
        ? chartColors.snow
        : chartColors.alertDefault;
  const MetricRow = ({
    label,
    value,
    color,
    icon,
  }: {
    label: string;
    value: React.ReactNode;
    color: string;
    icon?: React.ReactNode;
  }) => (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={1} alignItems="center">
        {icon ? (
          <Box
            sx={{
              width: 16,
              height: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        ) : (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: color,
              boxShadow: "0 0 8px rgba(15, 23, 42, 0.45)",
            }}
          />
        )}
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
      <Typography variant="subtitle1" fontWeight={700}>
        {value}
      </Typography>
    </Stack>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.25,
        minWidth: 220,
        backdropFilter: "blur(14px)",
        background: tooltipGradient,
        boxShadow: "0 22px 60px rgba(4, 6, 18, 0.55)",
      }}
    >
      <Stack spacing={1.25}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            {point.rangeLabel}
          </Typography>
          <Stack direction="row" spacing={1}>
            {point.isBluebird && (
              <Chip
                size="small"
                label="Bluebird"
                color="primary"
                variant="outlined"
              />
            )}
            {tone && (
              <Chip
                size="small"
                label={tone.label}
                color={tone.color}
                variant="filled"
              />
            )}
          </Stack>
        </Stack>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
        <Stack spacing={0.75}>
          <MetricRow
            label="Snow"
            value={`${point.inches ?? 0}"`}
            color={chartColors.snow}
            icon={
              <Snowflake
                size={16}
                color={chartColors.snow}
                strokeWidth={2.25}
              />
            }
          />
          <MetricRow
            label="Precipitation"
            value={`${point.precipInches ?? 0}"`}
            color={precipDotColor}
            icon={
              <CloudRain size={16} color={precipDotColor} strokeWidth={2.25} />
            }
          />
          <MetricRow
            label="Rain chance"
            value={`${point.precipProbability ?? 0}%`}
            color={chartColors.precipProbability}
            icon={
              <Droplets
                size={16}
                color={chartColors.precipProbability}
                strokeWidth={2.25}
              />
            }
          />
          {point.temperatureF != null && (
            <MetricRow
              label="Temperature"
              value={`${Math.round(point.temperatureF)}°F`}
              color={chartColors.temperature}
              icon={
                <Thermometer
                  size={16}
                  color={chartColors.temperature}
                  strokeWidth={2.25}
                />
              }
            />
          )}
          {point.windMph != null && (
            <MetricRow
              label="Wind"
              value={`${point.windMph} mph`}
              color={chartColors.wind}
              icon={
                <Wind size={16} color={chartColors.wind} strokeWidth={2.25} />
              }
            />
          )}
          {point.cloudCover != null && (
            <MetricRow
              label="Cloud cover"
              value={`${point.cloudCover}%`}
              color={chartColors.cloud}
              icon={
                <Cloud size={16} color={chartColors.cloud} strokeWidth={2.25} />
              }
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

type CustomChartProps = {
  data: ForecastPoint[];
  timeZone: TimeZoneId;
};

export default function CustomChart({ data, timeZone }: CustomChartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dayFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: isMobile ? "narrow" : "short",
    timeZone,
  });
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone,
  });
  const hourFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
    timeZone,
  });

  const chartData: ChartPoint[] = data.map((point, idx) => {
    const currentDate = new Date(point.time);
    const nextPoint = data[idx + 1];
    const nextTimeMs = nextPoint
      ? new Date(nextPoint.time).getTime()
      : idx > 0
        ? currentDate.getTime() +
        (currentDate.getTime() - new Date(data[idx - 1].time).getTime())
        : null;
    const hourLabel = hourFormatter
      .format(currentDate)
      .replace(/\s/g, "")
      .toLowerCase();
    const timeLabel = `${dateFormatter.format(currentDate)}, ${hourLabel}`;
    const rangeLabel = nextTimeMs
      ? `${timeLabel} - ${hourFormatter.format(new Date(nextTimeMs)).replace(/\s/g, "").toLowerCase()}`
      : timeLabel;
    const dayLabel = dayFormatter.format(currentDate);

    const hasMeaningfulPrecip = (point.precipInches ?? 0) > rainPrecipThreshold;
    const isRain = point.precipitationType === "rain";
    const probabilityValue = point.precipProbability ?? null;
    const hasRainProbability =
      probabilityValue != null && probabilityValue > rainWarningThreshold;
    const showRainRisk = isRain && hasMeaningfulPrecip && hasRainProbability;
    const chartProbability = showRainRisk ? probabilityValue : null;

    return {
      ...point,
      timeLabel,
      rangeLabel,
      dayLabel,
      precipProbability: probabilityValue,
      precipProbabilityChart: chartProbability,
      showRainRisk,
    };
  });

  const bluebirdWindows = chartData.filter((point) => point.isBluebird);
  const warningMap = new Map<
    NonNullable<ForecastPoint["alert"]>,
    {
      alert: NonNullable<ForecastPoint["alert"]>;
      startIndex: number;
      endIndex: number;
      startLabel: string;
      endLabel: string;
    }
  >();

  chartData.forEach((point, idx) => {
    const alert = point.showRainRisk ? "rain" : point.alert;
    if (!alert) return;
    const existing = warningMap.get(alert);
    if (!existing) {
      warningMap.set(alert, {
        alert,
        startIndex: idx,
        endIndex: idx,
        startLabel: point.timeLabel,
        endLabel: point.timeLabel,
      });
      return;
    }
    if (idx < existing.startIndex) {
      existing.startIndex = idx;
      existing.startLabel = point.timeLabel;
    }
    if (idx > existing.endIndex) {
      existing.endIndex = idx;
      existing.endLabel = point.timeLabel;
    }
  });

  const consolidatedWarnings = Array.from(warningMap.values()).sort(
    (a, b) => a.startIndex - b.startIndex,
  );

  const alertDotColor = (alert: ForecastPoint["alert"]) => {
    if (alert === "rain") return chartColors.alertRain;
    if (alert === "light-precip") return chartColors.alertLight;
    if (alert === "snow-ongoing") return chartColors.alertSnow;
    return chartColors.alertDefault;
  };

  const rainBands = (() => {
    const bands: { start: number; end: number }[] = [];
    let current: { start: number; end: number } | null = null;

    chartData.forEach((point, idx) => {
      if (point.showRainRisk) {
        if (!current) {
          current = { start: idx, end: idx };
          bands.push(current);
        } else {
          current.end = idx;
        }
      } else {
        current = null;
      }
    });

    return bands;
  })();

  const weatherSeries = [
    { id: "temperature", label: "Temp (°F)", color: chartColors.temperature },
    { id: "wind", label: "Wind (mph)", color: chartColors.wind },
    { id: "cloud", label: "Cloud cover (%)", color: chartColors.cloud },
    {
      id: "precip-prob",
      label: "Rain chance (%)",
      color: chartColors.precipProbability,
    },
  ] as const;

  const legendItems = [
    { id: "snowfall", label: "Snow (in)", color: chartColors.snow },
    ...weatherSeries.map(({ id, label, color }) => ({ id, label, color })),
  ];

  const xAxisTicks = chartData.reduce<string[]>((acc, point, idx) => {
    const previous = chartData[idx - 1];
    if (!previous || previous.dayLabel !== point.dayLabel) {
      acc.push(point.time);
    }
    return acc;
  }, []);

  const chartHeight = isMobile ? 360 : 520;
  const chartMargin = {
    top: 24,
    right: isMobile ? 18 : 36,
    bottom: isMobile ? 28 : 32,
    left: isMobile ? 16 : 26,
  };
  const bandInset = {
    top: chartMargin.top,
    bottom: chartMargin.bottom,
    left: isMobile ? 8 : 12,
    right: chartMargin.right,
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={panelSx}>
            <Stack spacing={1.5}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight={700}
              >
                Warnings
              </Typography>
              {consolidatedWarnings.length ? (
                <Stack spacing={1}>
                  {consolidatedWarnings.map((warning) => (
                    <Stack
                      key={warning.alert}
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                    >
                      {warning.alert === "rain" ? (
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            mt: 0.35,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CloudRain
                            size={16}
                            color={chartColors.alertRain}
                            strokeWidth={2.25}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            mt: 0.75,
                            backgroundColor: alertDotColor(warning.alert),
                          }}
                        />
                      )}
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
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={panelSx}>
            <Stack spacing={1.5}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight={700}
              >
                Bluebird windows
              </Typography>
              {bluebirdWindows.length ? (
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {bluebirdWindows.map((point) => (
                    <Chip
                      key={point.startTime}
                      label={`${point.timeLabel}${point.alert === "light-precip" ? " · light precip" : ""}`}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ color: "#dbeafe" }}
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
      </Grid>

      <Paper elevation={0} sx={chartPanelSx}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Stack sx={{ mb: 1 }}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Snowfall outlook</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Bars show expected snowfall, lines show temperature, wind, and
              cloud cover.
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            alignItems="center"
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            {legendItems.map((series) => (
              <Stack
                key={series.id}
                direction="row"
                spacing={0.75}
                alignItems="center"
              >
                <Box
                  sx={{ width: 10, height: 10, backgroundColor: series.color }}
                />
                <Typography variant="caption">{series.label}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Box
          sx={{
            position: "relative",
            height: chartHeight,
            minHeight: chartHeight,
            minWidth: 0,
            width: "100%",
            userSelect: "none",
            WebkitUserSelect: "none",
            WebkitTapHighlightColor: "transparent",
            "& .recharts-wrapper": {
              outline: "none",
            },
            "& .recharts-surface": {
              outline: "none",
            },
            "& .recharts-surface *": {
              outline: "none",
            },
            "& .recharts-layer": {
              outline: "none",
            },
            "& .recharts-rectangle": {
              outline: "none",
            },
            "& .recharts-bar-rectangle": {
              outline: "none",
            },
            "& .recharts-dot": {
              outline: "none",
            },
            "& .recharts-active-dot": {
              outline: "none",
            },
            "& .recharts-line-dot": {
              outline: "none",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: bandInset.top,
              bottom: bandInset.bottom,
              left: bandInset.left,
              right: bandInset.right,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            {rainBands.map((band, idx) => {
              const left = (band.start / chartData.length) * 100;
              const width =
                ((band.end - band.start + 1) / chartData.length) * 100;
              return (
                <Box
                  key={`rain-band-${band.start}-${band.end}-${idx}`}
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: `${left}%`,
                    width: `${width}%`,
                    background: chartColors.rainBand.fill,
                    backdropFilter: "blur(2px)",
                    borderLeft: `1px solid ${chartColors.rainBand.borderLeft}`,
                    borderRight: `1px solid ${chartColors.rainBand.borderRight}`,
                  }}
                />
              );
            })}
          </Box>
          <ResponsiveContainer
            width="100%"
            height={chartHeight}
            minHeight={chartHeight}
            minWidth={320}
          >
            <ComposedChart
              data={chartData}
              margin={chartMargin}
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
                ticks={xAxisTicks}
                tickFormatter={(value) =>
                  dayFormatter.format(new Date(String(value)))
                }
                tick={{
                  fill: "#d7e3ff",
                  fontSize: isMobile ? 10 : 12,
                  fontWeight: 600,
                }}
                tickMargin={isMobile ? 8 : 12}
                axisLine={{ stroke: "rgba(203, 213, 245, 0.35)" }}
                tickLine={{ stroke: "rgba(203, 213, 245, 0.35)" }}
              />
              <YAxis yAxisId="snow" hide domain={[0, "auto"]} />
              <YAxis yAxisId="weather" hide domain={[0, 100]} />
              <Tooltip<number, string>
                content={(props) => (
                  <ForecastTooltip {...props} points={chartData} />
                )}
                cursor={{ stroke: "rgba(219, 231, 255, 0.25)" }}
                filterNull={false}
                shared
                wrapperStyle={{ outline: "none" }}
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
  );
}
