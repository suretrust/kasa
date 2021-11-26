import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useSelector, useDispatch } from 'react-redux'

import API from '../../api'
import Loader from '../../components/Loading'
import { getPlaceDoorsAction } from '../../redux/actions/placeDoors'
import { addGroupDoorAction } from '../../redux/actions/groupDoors'
import { GROUP_DOOR_ADD_SUCCESS } from '../../constants/snackMessages'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: '400px',
  backgroundColor: 'secondary.main',
  boxShadow: 24,
  borderRadius: '0.5rem',
  p: 4
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const AddDoorModal = ({
  showForm,
  handleHideForm,
  groupId,
  placeId,
  setSnackMsg
}) => {
  const [selectedDoors, setSelectedDoors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [errorDoors, setErrorDoors] = useState([])

  const dispatch = useDispatch()
  const placeDoors = useSelector(state => state.placeDoors.placeDoors)

  useEffect(() => {
    const fetchPlaceDoors = async () => {
      const response = await API.getPlaceDoors(placeId)
      const { data } = response
      setIsLoading(false)

      dispatch(getPlaceDoorsAction(data))
    }

    fetchPlaceDoors()
  }, [placeId, dispatch])

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setSelectedDoors(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const handleDelete = (e, value) => {
    e.preventDefault()
    const newSelected = selectedDoors.filter(door => door.id !== value.id)
    setSelectedDoors(newSelected)
  }

  const handleAddGroupDoors = async () => {
    let doorErrors = []
    setIsAdding(true)
    for await (const door of selectedDoors) {
      const response = await API.addGroupDoor(groupId, door.id)
      const { error } = response

      if (!!error) doorErrors.push(door)
      else dispatch(addGroupDoorAction(response))
    }
    setIsAdding(false)

    if (!doorErrors?.length) {
      await setSnackMsg(GROUP_DOOR_ADD_SUCCESS)
      return handleHideForm()
    }

    setErrorDoors(doorErrors)
  }

  return (
    <div data-testid='add-door-modal'>
      <Modal
        open={showForm}
        onClose={handleHideForm}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {isLoading ? (
          <Box>
            <Loader />
          </Box>
        ) : (
          <Box sx={style}>
            <Box>
              <Typography
                color='primary'
                id='modal-modal-title'
                variant='h6'
                component='h2'
              >
                Add Doors
              </Typography>
              {!errorDoors?.length ? (
                <FormControl sx={{ width: '100%', mt: 2 }}>
                  <InputLabel id='door-select'>Search doors</InputLabel>
                  <Select
                    labelId='door-select'
                    id='multiple-door-select'
                    multiple
                    value={selectedDoors}
                    fullWidth
                    onChange={handleChange}
                    input={
                      <OutlinedInput
                        id='multiple-select'
                        label='Search doors'
                      />
                    }
                    renderValue={selected => (
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1.5,
                          maxHeight: '4rem',
                          overflowY: 'scroll'
                        }}
                      >
                        {selected.map(value => (
                          <Chip
                            onDelete={e => handleDelete(e, value)}
                            key={value.name}
                            label={value.name}
                            onMouseDown={event => {
                              event.stopPropagation()
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {placeDoors.map(item => (
                      <MenuItem key={item.name} value={item}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <>
                  <Typography my={2}>
                    The following doors could not be added
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1.5,
                      maxHeight: '4rem',
                      overflowY: 'scroll'
                    }}
                  >
                    {errorDoors.map(value => (
                      <Chip key={value.name} label={value.name} />
                    ))}
                  </Box>
                </>
              )}
              <Box mt={4} textAlign='right'>
                <Button onClick={handleHideForm}>
                  {!errorDoors?.length ? 'Cancel' : 'Close'}
                </Button>
                {!errorDoors?.length && (
                  <Button
                    sx={{ ml: 2 }}
                    disabled={!selectedDoors?.length || isAdding}
                    onClick={handleAddGroupDoors}
                    variant='contained'
                  >
                    {isAdding ? 'Adding Doors' : 'Add Doors'}
                    {isAdding && <CircularProgress size={20} sx={{ ml: 1 }} />}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Modal>
    </div>
  )
}

AddDoorModal.propTypes = {
  showForm: PropTypes.bool.isRequired,
  handleHideForm: PropTypes.func.isRequired,
  setSnackMsg: PropTypes.func.isRequired,
  placeId: PropTypes.number.isRequired,
  groupId: PropTypes.number.isRequired
}

export default AddDoorModal
