import { IconButton, Tooltip } from '@mui/material'

import { useColorScheme } from '@mui/material/styles'

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

export default function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme()

  // Avoid rendering before the initial mode is resolved.
  if (!mode) {
    return null
  }

  const activeMode = mode === 'system' ? systemMode : mode

  const isDark = activeMode === 'dark'

  const handleToggle = () => {
    setMode(isDark ? 'light' : 'dark')
  }

  return (
    <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={handleToggle}
        color="primary"
        aria-label="Toggle color theme"
      >
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  )
}
