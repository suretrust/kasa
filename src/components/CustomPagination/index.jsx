import { Divider, Pagination } from '@mui/material'
import { Box } from '@mui/system'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router'

const CustomPagination = ({
  pagination,
  handlePaginationCallback,
  page,
  setPage
}) => {
  const { limit, count } = pagination
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const paginationCount = Math.ceil(count / limit)

  const handlePagination = (event, value) => {
    if (value === page) return

    navigate(`${pathname}?page=${value}`, { replace: true })
    setPage(Number(value))
    const offset = (value - 1) * limit
    handlePaginationCallback(offset)
  }

  return (
    <Box
      data-testid='custom-pagination'
      sx={{
        position: 'absolute',
        bottom: 0,
        height: '5rem',
        right: 0,
        left: 0
      }}
    >
      <Divider />
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Pagination
          siblingCount={0}
          data-testid="pagination-btn"
          size='small'
          color='primary'
          page={page}
          count={paginationCount}
          onChange={handlePagination}
        />
      </Box>
    </Box>
  )
}

CustomPagination.propTypes = {
  pagination: PropTypes.shape({
    count: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired
  }).isRequired,
  handlePaginationCallback: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
}

export default CustomPagination
