import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate
} from 'react-router-dom'

import './App.css'
import GroupDetails from './containers/GroupDetails'
import Groups from './containers/Groups'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Groups />} />
        <Route path='/groups/:id' element={<GroupDetails />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </Router>
  )
}

export default App
