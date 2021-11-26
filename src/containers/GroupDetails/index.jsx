import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Paper, Typography } from '@mui/material'
import { Box, useTheme } from '@mui/system'

import Layout from '../../components/Layout'
import API from '../../api'
import { getGroupDetailsAction } from '../../redux/actions/groups'
import Loader from '../../components/Loading'
import NoData from '../../components/NoData'
import {
  deleteGroupDoorAction,
  getGroupDoorsAction
} from '../../redux/actions/groupDoors'
import CustomPagination from '../../components/CustomPagination'
import CustomAlert from '../../components/CustomAlert'
import AddDoorModal from '../AddDoorModal'
import DoorItem from '../../components/DoorItem'
import { GROUP_DOOR_DELETE_SUCCESS, NETWORK_ERROR, SNACK_ERROR_BACKGROUND } from '../../constants/snackMessages'

const GroupDetails = () => {
  const [pagination, setPagination] = useState()
  const [showForm, setShowForm] = useState(false)
  const [page, setPage] = useState(1)
  const [snackMsg, setSnackMsg] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(0)
  const [snackBgColor, setSnackBgColor] = useState(undefined)

  const handleShowForm = () => setShowForm(true)
  const handleHideForm = () => setShowForm(false)

  const { pathname, search } = useLocation()
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id: groupId } = useParams()
  const pageParam = new URLSearchParams(search).get('page')

  const groupDetails = useSelector(state => state.groupDetails.groupDetails)
  const groupDoors = useSelector(state => state.groupDoors.groupDoors)

  const fetchGroupDetails = useCallback(
    async offset => {
      if (!pathname?.length || !groupId) return navigate('/')

      setIsLoading(true)
      const [groupDetailsResponse, groupDoorsResponse] = await Promise.all([
        API.getGroupDetails(pathname),
        API.getGroupDoors(groupId, offset)
      ])
      const { error: detailsErr } = groupDetailsResponse
      const { error: doorsErr } = groupDoorsResponse
      setIsLoading(false)

      if (detailsErr || doorsErr) {
        setSnackMsg(NETWORK_ERROR)
        return setSnackBgColor(SNACK_ERROR_BACKGROUND)
      }

      const { pagination: paginationData, data } = groupDoorsResponse
      setPagination(paginationData)
      dispatch(getGroupDoorsAction(data))
      dispatch(getGroupDetailsAction(groupDetailsResponse))
    },
    [dispatch, groupId, navigate, pathname]
  )

  useEffect(() => {
    const pageOffset = pageParam && (pageParam - 1) * 5
    fetchGroupDetails(pageOffset)

    if (pageParam) setPage(Number(pageParam))
    else setPage(1)
  }, [fetchGroupDetails, pageParam])

  const handleDeleteDoor = async doorObjectId => {
    setIsDeleting(doorObjectId)
    await API.deleteGroupDoor(doorObjectId)
    setIsDeleting(0)

    setSnackMsg(GROUP_DOOR_DELETE_SUCCESS)
    dispatch(deleteGroupDoorAction(doorObjectId))
  }

  if (isLoading) return <Loader />

  return (
    <Layout>
      {!!snackMsg && (
        <CustomAlert
          backgroundColor={snackBgColor}
          setBackgroundColor={setSnackBgColor}
          message={snackMsg}
          setMessage={setSnackMsg}
        />
      )}
      {showForm && (
        <AddDoorModal
          placeId={groupDetails.placeId}
          groupId={groupDetails.id}
          showForm={showForm}
          handleHideForm={handleHideForm}
          setSnackMsg={setSnackMsg}
        />
      )}
      <Box width={{ xs: '280px', sm: '300px', md: '400px', lg: '600px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant='h5' fontWeight={600} color='primary'>
            {groupDetails.name || 'Group name'}
          </Typography>
          <Button variant='contained' onClick={handleShowForm}>
            Add Doors
          </Button>
        </Box>
        <Paper
          elevation={3}
          sx={{
            marginTop: theme.spacing(2),
            height: '78.5vh',
            position: 'relative'
          }}
        >
          {groupDoors?.length ? (
            groupDoors.map(door => (
              <DoorItem
                isDeleting={isDeleting}
                handleDeleteDoor={handleDeleteDoor}
                key={door.id}
                door={door.lock}
                doorObjectId={door.id}
              />
            ))
          ) : (
            <NoData text='You have no door' />
          )}
          {pagination && (
            <CustomPagination
              pagination={pagination}
              handlePaginationCallback={fetchGroupDetails}
              page={page}
              setPage={setPage}
            />
          )}
        </Paper>
      </Box>
    </Layout>
  )
}

export default GroupDetails
