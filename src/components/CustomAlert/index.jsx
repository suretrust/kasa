import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { SnackbarContent, useTheme } from '@mui/material'

const CustomAlert = ({
  message,
  setMessage,
  backgroundColor,
  setBackgroundColor
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const theme = useTheme()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    handleExited()
    setIsOpen(false)
  }

  const handleExited = () => {
    setMessage(undefined)
    setBackgroundColor(undefined)
  }

  if (!message) return null

  return (
    <Snackbar
      data-testid='custom-alert'
      key={message}
      open={isOpen}
      sx={{ zIndex: 99999 }}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <SnackbarContent
        message={message}
        style={{
          backgroundColor: backgroundColor || theme.palette.primary.main
        }}
        action={
          <React.Fragment>
            <IconButton
              aria-label='close'
              color='inherit'
              sx={{ p: 0.5 }}
              data-testid='close-custom-alert'
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </Snackbar>
  )
}

CustomAlert.propTypes = {
  message: PropTypes.string,
  backgroundColor: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  setBackgroundColor: PropTypes.func.isRequired
}

export default CustomAlert
