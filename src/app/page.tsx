import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { Suspense } from 'react'
import SnowForecast from '../components/SnowForecast'

export default async function Page() {
  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3.5}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(19,33,61,0.9), rgba(30,58,138,0.9))',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 30px 80px rgba(6, 12, 28, 0.35)',
            }}>
            <Stack spacing={2.5}>
              <Stack spacing={1}>
                <Typography variant="h3" component="h1">
                  Mt. Bachelor snow forecast
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 820 }}>
                  A quick, visual snowfall outlook for Mt. Bachelor in Bend, Oregon—powered by live NOAA data.
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          <Suspense fallback={<Typography variant="body2">Loading NOAA forecast…</Typography>}>
            <SnowForecast />
          </Suspense>
        </Stack>
      </Container>
    </Box>
  )
}
