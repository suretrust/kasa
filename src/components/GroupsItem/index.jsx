import { Typography, Avatar, Tooltip, ListItem } from '@mui/material'
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined'
import GroupsIcon from '@mui/icons-material/Groups'
import { Box, useTheme } from '@mui/system'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'

const GroupItem = ({ group }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  const handleGroupClick = groupId => {
    navigate(`/groups/${groupId}`)
  }

  return (
    <ListItem
      button
      data-testid='group-item'
      onClick={() => handleGroupClick(group.id)}
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
            <GroupsIcon />
          </Avatar>
        </Box>
        <Box>
          <Typography>{group.name}</Typography>
          <Typography
            variant='caption'
            display='block'
            color='tertiary'
            noWrap
            maxWidth={{ xs: '15ch', md: '25ch', lg: '40ch' }}
            sx={{
              textOverflow: 'ellipsis'
            }}
          >
            {group?.description || 'No description'}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center'
        }}
      >
        <Tooltip title='Doors' placement='top'>
          <SensorDoorOutlinedIcon color='secondary' />
        </Tooltip>
        {group.locksCount}
      </Box>
    </ListItem>
  )
}

GroupItem.propTypes = {
  group: PropTypes.shape({
    locksCount: PropTypes.number.isRequired,
    description: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default GroupItem
