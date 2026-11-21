import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'

import AuthLayout from '../components/AuthLayout'
import LoginForm from '../components/LoginForm'

import ThemeToggle from '../../../components/shared/ThemeToggle'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Login to continue to your TradeX account."
      headerAction={<ThemeToggle />}
      footer={
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Don't have an account?
          </Typography>

          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            sx={{
              fontWeight: 600,
            }}
          >
            Create account
          </Link>
        </Stack>
      }
    >
      <LoginForm />
    </AuthLayout>
  )
}
