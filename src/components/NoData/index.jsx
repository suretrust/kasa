import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const NoData = ({ text }) => {
  return (
    <Typography
      data-testid='no-data'
      sx={{
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {text}
    </Typography>
  )
}

NoData.propTypes = {
  text: PropTypes.string.isRequired
}

export default NoData
