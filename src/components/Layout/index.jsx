import PropTypes from 'prop-types'
import LayoutHeader from '../LayoutHeader'
import { Box } from '@mui/system'

const Layout = props => {
  return (
    <Box data-testid='layout'>
      <LayoutHeader />
      <Box
        width={{ md: 'calc(100vw - 260px)' }}
        marginLeft={{ sm: '260px' }}
        marginTop={{ xs: '100px' }}
        marginBottom={{ xs: '60px' }}
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center',
          justifyItems: 'center'
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
