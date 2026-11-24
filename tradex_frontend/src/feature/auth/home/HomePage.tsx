import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'

import { logoutUser } from '../../auth/store/authThunks'

export default function HomePage() {
  const dispatch = useAppDispatch()

  const { user } =
    useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
  }


  if (!user) {
    return (
      <Box
        sx={{minHeight:"70vh",
        display:"flex",
        alignItems:"center",
        justifyContent: "center",
        px:2
    }}
        
      >
        <Card sx={{ maxWidth: 450, width: '100%' }}>
          <CardContent>
            <Stack spacing={2} sx={{alignItems: "center"}}>
              <Avatar sx={{ width: 64, height: 64 }}>
                <Typography variant="h4">?</Typography>
              </Avatar>

              <Typography variant="h5" sx={{fontWeight:700}}>
                Welcome to TradeX
              </Typography>

              <Typography color="text.secondary">
                Please log in to view your profile.
              </Typography>

              <Button
                fullWidth
                variant="contained"
                href="/login"
              >
                Login
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        py: 5,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: 450,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>

            <Stack sx={{alignItems: "center"}} spacing={1}>
              <Avatar
                sx={{
                  width: 76,
                  height: 76,
                  bgcolor: 'primary.main',
                  fontSize: 30,
                }}
              >
                {user.firstName.charAt(0).toUpperCase()}
              </Avatar>

              <Typography variant="h5" sx={{fontWeight:700}}>
                Welcome, {user.firstName}!
              </Typography>

              <Typography color="success.main" variant="body2">
                Authenticated successfully
              </Typography>
            </Stack>

            <Divider />

            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  User ID
                </Typography>
                <Typography sx={{fontWeight:600}}>
                  {user.id}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  First name
                </Typography>
                <Typography sx={{fontWeight:600}}>
                  {user.firstName}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Last name
                </Typography>
                <Typography sx={{fontWeight:600}}>
                  {user.lastName}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography sx={{fontWeight:600}}>
                  {user.email}
                </Typography>
              </Box>
            </Stack>

            <Button
              fullWidth
              color="error"
              variant="outlined"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}