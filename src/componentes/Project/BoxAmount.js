import React from 'react'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { Card, CardContent, Grid, Icon, useTheme } from '@mui/material'
import Currency from '../formatter/Currency'

export const BoxAmountSuccess = (props) => {
  BoxAmountSuccess.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    icon: PropTypes.string.isRequired,
  }
  const theme = useTheme()
  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 1,
      }}
    >
      <Card
        variant="elevation"
        sx={{
          backgroundColor: theme.palette.success.main,
        }}
      >
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Box sx={{ color: theme.palette.success.light, fontSize: 20, fontWeight: 'medium' }}>
                {props.title}
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid
              item
              xs={8}
              md={8}
              marginTop={1}
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Box
                sx={{
                  color: theme.palette.success.contrastText,
                  fontSize: 34,
                  fontWeight: 'medium',
                  whiteSpace: 'nowrap',
                }}
              >
                {Currency(props.amount)}
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Icon
                sx={{
                  color: theme.palette.success.dark,
                  fontSize: 60,
                  borderRadius: 100,
                  backgroundColor: theme.palette.success.light,
                }}
              >
                {props.icon}
              </Icon>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export const BoxAmountError = (props) => {
  BoxAmountError.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    icon: PropTypes.string.isRequired,
  }
  const theme = useTheme()

  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 1,
      }}
    >
      <Card
        variant="elevation"
        sx={{
          backgroundColor: theme.palette.error.main,
        }}
      >
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Box sx={{ color: theme.palette.error.light, fontSize: 20, fontWeight: 'medium' }}>
                {props.title}
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid
              item
              xs={8}
              md={8}
              marginTop={1}
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Box
                sx={{
                  color: theme.palette.error.contrastText,
                  fontSize: 34,
                  fontWeight: 'medium',
                  whiteSpace: 'nowrap',
                }}
              >
                {Currency(props.amount)}
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Icon
                sx={{
                  color: theme.palette.error.dark,
                  fontSize: 60,
                  borderRadius: 100,
                  backgroundColor: theme.palette.error.light,
                }}
              >
                {props.icon}
              </Icon>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export const BoxAmountWarning = (props) => {
  BoxAmountWarning.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    icon: PropTypes.string.isRequired,
  }
  const theme = useTheme()
  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 1,
      }}
    >
      <Card
        variant="elevation"
        sx={{
          backgroundColor: theme.palette.warning.main,
        }}
      >
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Box sx={{ color: theme.palette.warning.light, fontSize: 20, fontWeight: 'medium' }}>
                {props.title}
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid
              item
              xs={8}
              md={8}
              marginTop={1}
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Box
                sx={{
                  color: theme.palette.warning.contrastText,
                  fontSize: 34,
                  fontWeight: 'medium',
                  whiteSpace: 'nowrap',
                }}
              >
                {Currency(props.amount)}
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Icon
                sx={{
                  color: theme.palette.warning.dark,
                  fontSize: 60,
                  borderRadius: 100,
                  backgroundColor: theme.palette.warning.light,
                }}
              >
                {props.icon}
              </Icon>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export const BoxAmountPrimary = (props) => {
  BoxAmountPrimary.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    icon: PropTypes.string.isRequired,
  }
  const theme = useTheme()
  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 1,
      }}
    >
      <Card
        variant="elevation"
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Box sx={{ color: theme.palette.primary.light, fontSize: 20, fontWeight: 'medium' }}>
                {props.title}
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid
              item
              xs={8}
              md={8}
              marginTop={1}
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Box
                sx={{
                  color: theme.palette.primary.contrastText,
                  fontSize: 34,
                  fontWeight: 'medium',
                  whiteSpace: 'nowrap',
                }}
              >
                {Currency(props.amount)}
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Icon
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: 60,
                  borderRadius: 100,
                  backgroundColor: theme.palette.primary.light,
                }}
              >
                {props.icon}
              </Icon>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
export const BoxAmountSecondary = (props) => {
  BoxAmountSecondary.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    icon: PropTypes.string.isRequired,
  }
  const theme = useTheme()

  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 1,
        minWidth: 300,
      }}
    >
      <Card
        variant="elevation"
        sx={{
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Box
                sx={{ color: theme.palette.secondary.light, fontSize: 20, fontWeight: 'medium' }}
              >
                {props.title}
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid
              item
              xs={8}
              md={8}
              marginTop={1}
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Box
                sx={{
                  color: theme.palette.secondary.contrastText,
                  fontSize: 34,
                  fontWeight: 'medium',
                  whiteSpace: 'nowrap',
                }}
              >
                {Currency(props.amount)}
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Icon
                sx={{
                  color: theme.palette.secondary.dark,
                  fontSize: 60,
                  borderRadius: 100,
                  backgroundColor: theme.palette.secondary.light,
                }}
              >
                {props.icon}
              </Icon>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
