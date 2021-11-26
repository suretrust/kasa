import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'
import MockTheme from './testUtils/mockTheme'

describe('Alert component', () => {
  it('renders kasa in the app', () => {
    render(
      <MockTheme>
        <Provider store={store}>
          <App />
        </Provider>
      </MockTheme>
    )

    const kasa = screen.getByText(/kasa/i)
    expect(kasa).toBeInTheDocument()
  })
})
