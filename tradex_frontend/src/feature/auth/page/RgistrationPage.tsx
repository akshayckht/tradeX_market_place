import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'

import AuthLayout from '../components/AuthLayout'
import RegisterForm from '../components/RegisterForm'

import ThemeModeToggle from '../../../components/shared/ThemeToggle'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      description="Join TradeX and start buying and selling."
      headerAction={<ThemeModeToggle />}
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
            Already have an account?
          </Typography>

          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        </Stack>
      }
    >
      <RegisterForm />
    </AuthLayout>
  )
}
