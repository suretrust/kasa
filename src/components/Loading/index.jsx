import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

import Layout from '../Layout'

const Loader = () => {
  return (
    <Layout>
      <Box
        data-testid='loading'
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridAutoRows: '70vh',
          alignItems: 'center',
          justifyItems: 'center'
        }}
      >
        <CircularProgress thickness={2} size={100} />
      </Box>
    </Layout>
  )
}

export default Loader
