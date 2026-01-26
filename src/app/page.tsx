import LocationMenu from "@/components/LocationMenu";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import SnowForecast from "../components/SnowForecast";
import { surfaceGradient } from "../data/chartStyles";
import {
  forecastLocations,
  forecastStates,
  getForecastLocation,
  getForecastLocationsForState,
  getForecastState,
} from "../data/forecastLocations";
import { resolveTimeZoneId, timeZoneOptions } from "../data/timeZones";

type PageProps = {
  searchParams?:
  | {
    location?: string | string[];
    state?: string | string[];
    timezone?: string | string[];
  }
  | Promise<{
    location?: string | string[];
    state?: string | string[];
    timezone?: string | string[];
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const locationParam = Array.isArray(resolvedSearchParams?.location)
    ? resolvedSearchParams?.location[0]
    : resolvedSearchParams?.location;
  const stateParam = Array.isArray(resolvedSearchParams?.state)
    ? resolvedSearchParams?.state[0]
    : resolvedSearchParams?.state;
  const timeZoneValue = resolveTimeZoneId(resolvedSearchParams?.timezone);
  const locationFromParam = getForecastLocation(locationParam);
  const resolvedState = getForecastState(stateParam ?? locationFromParam.state);
  const stateLocations = getForecastLocationsForState(resolvedState);
  const location =
    stateLocations.find((item) => item.id === locationFromParam.id) ??
    stateLocations[0] ??
    locationFromParam;

  const locationMenu = {
    locations: forecastLocations,
    states: forecastStates,
    stateValue: resolvedState,
    value: location.id,
    timeZoneOptions,
    timeZoneValue,
  };
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3.5}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              background: surfaceGradient,
              boxShadow: "0 20px 50px rgba(6, 12, 28, 0.35)",
            }}
          >
            <Stack spacing={2.5}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", md: "center" }}
                justifyContent="space-between"
              >
                <Stack spacing={1}>
                  <Typography variant="h3" component="h1">
                    Powder Meter
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", maxWidth: 820 }}
                  >
                    A quick, visual snow centric forcast
                  </Typography>
                </Stack>
              </Stack>
              <LocationMenu {...locationMenu} />
            </Stack>
          </Paper>

          <Suspense
            fallback={
              <Typography variant="body2">Loading NOAA forecast…</Typography>
            }
          >
            <SnowForecast locationId={location.id} timeZoneId={timeZoneValue} />
          </Suspense>
          <Box
            component="footer"
            sx={{
              mt: { xs: 4, md: 5 },
              pt: 2.5,
              borderTop: "1px solid rgba(226, 232, 255, 0.16)",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1}
              alignItems={{ xs: "flex-start", md: "center" }}
              justifyContent="space-between"
            >
              <Typography variant="body2" color="text.secondary">
                © {currentYear} Jeremiah Barrar
              </Typography>
              <Button
                href="https://github.com/barrar/powder-meter"
                target="_blank"
                rel="noreferrer"
                color="primary"
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                Source Code on GitHub
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
