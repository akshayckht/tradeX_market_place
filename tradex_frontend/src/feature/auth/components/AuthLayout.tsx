import type { ReactNode } from 'react'


import {
  AppBar,
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

import TradeXLogo from '../../../components/shared/TradeXLogo.tsx'

interface AuthLayoutProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
  headerAction?: ReactNode
}

export default function AuthLayout({
  title,
  description,
  children,
  footer,
  headerAction,
}: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {/* ================= HEADER ================= */}
      <AppBar
        component="header"
        position="static"
        elevation={0}
        color="transparent"
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, md: 72 },
              justifyContent: 'space-between',
            }}
          >
            {/* Brand Logo */}
            <TradeXLogo size="medium" />

            {/* Header Actions */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Your local marketplace
              </Typography>

              {headerAction}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          py: { xs: 4, sm: 6 },
          bgcolor: 'background.default',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 0,
          }}
        >
          {/* Authentication Card */}
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              width: '100%',
              maxWidth: 460,
              overflow: 'hidden',
              borderRadius: 3,
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            {/* Blue Accent */}
            <Box
              sx={{
                height: 5,
                bgcolor: 'primary.main',
              }}
            />

            <Stack
              spacing={3}
              sx={{
                p: { xs: 3, sm: 4 },
              }}
            >
              {/* Page Heading */}
              <Stack
                spacing={1}
                sx={{
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  component="h1"
                  color="text.primary"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Stack>

              {/* Page Content */}
              {children}

              {/* Optional Footer */}
              {footer && (
                <>
                  <Divider />

                  <Box
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    {footer}
                  </Box>
                </>
              )}
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}
