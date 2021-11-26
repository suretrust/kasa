import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Typography } from '@mui/material'
import { Box, useTheme } from '@mui/system'
import { useLocation } from 'react-router'

import API from '../../api'
import { getGroupsAction } from '../../redux/actions/groups'
import Layout from '../../components/Layout'
import GroupItem from '../../components/GroupsItem'
import CustomPagination from '../../components/CustomPagination'
import Loader from '../../components/Loading'
import NoData from '../../components/NoData'
import { PAGINATION_LIMIT } from '../../constants/paginationLimit'
import CustomAlert from '../../components/CustomAlert'
import { NETWORK_ERROR } from '../../constants/snackMessages'

const Groups = () => {
  const [pagination, setPagination] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [snackBgColor, setSnackBgColor] = useState(undefined)
  const [snackMsg, setSnackMsg] = useState(undefined)
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const groups = useSelector(state => state.groups.groups)
  const { search } = useLocation()
  const theme = useTheme()
  const pageParam = new URLSearchParams(search).get('page')

  const fetchGroups = useCallback(
    async offset => {
      setIsLoading(true)
      const response = await API.getGroups(offset)
      setIsLoading(false)
      const { data, error, pagination: paginationData } = response
      if (error) {
        setSnackMsg(NETWORK_ERROR)
        return setSnackBgColor('brown')
      }

      setPagination(paginationData)
      dispatch(getGroupsAction(data))
    },
    [dispatch]
  )

  useEffect(() => {
    // using 5 because it's the default offset
    const pageOffset = pageParam && (pageParam - 1) * PAGINATION_LIMIT
    fetchGroups(pageOffset)

    if (pageParam) setPage(Number(pageParam))
    else setPage(1)
  }, [fetchGroups, pageParam])

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
      <Box width={{ xs: '280px', sm: '300px', md: '400px', lg: '600px' }}>
        <Typography variant='h5' fontWeight={600} color='primary'>
          Groups {pagination && `(${pagination.count})`}
        </Typography>
        <Paper
          elevation={3}
          sx={{
            marginTop: theme.spacing(2),
            height: '78.5vh',
            position: 'relative'
          }}
        >
          {groups?.length ? (
            groups.map(group => <GroupItem key={group.id} group={group} />)
          ) : (
            <NoData text='You have not added any group' />
          )}
          {pagination && (
            <CustomPagination
              pagination={pagination}
              handlePaginationCallback={fetchGroups}
              page={page}
              setPage={setPage}
            />
          )}
        </Paper>
      </Box>
    </Layout>
  )
}

export default Groups
