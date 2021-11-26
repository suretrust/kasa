import {
  Typography,
  Avatar,
  ListItem,
  Tooltip,
  CircularProgress,
  IconButton
} from '@mui/material'
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Box, useTheme } from '@mui/system'
import PropTypes from 'prop-types'

const DoorItem = ({ door, handleDeleteDoor, doorObjectId, isDeleting }) => {
  const theme = useTheme()

  return (
    <ListItem
      data-testid='door-item'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2rem'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center'
        }}
      >
        <Box mr={1}>
          <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
            <SensorDoorOutlinedIcon />
          </Avatar>
        </Box>
        <Box>
          <Typography>{door.name}</Typography>
          <Typography
            variant='caption'
            display='block'
            noWrap
            maxWidth={{ xs: '15ch', md: '25ch', lg: '40ch' }}
            sx={{
              textOverflow: 'ellipsis'
            }}
          >
            {door?.description || 'No description'}
          </Typography>
        </Box>
      </Box>
      <Tooltip
        onClick={() => handleDeleteDoor(doorObjectId)}
        title='Unassign door from group'
        placement='top'
      >
        {isDeleting === doorObjectId ? (
          <CircularProgress
            data-testid='in-progress'
            size={20}
            sx={{ mr: 1 }}
          />
        ) : (
          <IconButton>
            <RemoveCircleOutlineIcon color='secondary' />
          </IconButton>
        )}
      </Tooltip>
    </ListItem>
  )
}

DoorItem.propTypes = {
  door: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  doorObjectId: PropTypes.number.isRequired,
  handleDeleteDoor: PropTypes.func.isRequired,
  isDeleting: PropTypes.number.isRequired
}

export default DoorItem
