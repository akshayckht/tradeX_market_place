import { Box, Typography } from '@mui/material'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'

interface TradeXLogoProps {
  size?: 'small' | 'medium'
  href?: string
}

export default function TradeXLogo({
  size = 'medium',
  href = '/',
}: TradeXLogoProps) {
  const isSmall = size === 'small'

  return (
    <Box
      component="a"
      href={href}
      aria-label="TradeX home"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        color: 'primary.main',
        flexShrink: 0,

        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 4,
          borderRadius: 1,
        },
      }}
    >
      {/* Logo icon */}
      <Box
        sx={{
          width: isSmall ? 32 : 38,
          height: isSmall ? 32 : 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <StorefrontOutlinedIcon sx={{ fontSize: isSmall ? 20 : 24 }} />
      </Box>

      {/* Brand name */}
      <Typography
        component="span"
        sx={{
          fontSize: isSmall ? '1.2rem' : '1.5rem',
          fontWeight: 800,
          letterSpacing: '-0.8px',
          color: 'primary.main',
          lineHeight: 1,
        }}
      >
        TradeX
      </Typography>
    </Box>
  )
}
