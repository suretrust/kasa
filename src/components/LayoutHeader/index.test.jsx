import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { MemoryRouter } from 'react-router'

import LayoutHeader from '.'
import MockTheme from '../../testUtils/mockTheme'

describe('LayoutHeader component', () => {
  it('has a component with data test id of layout-header', () => {
    render(
      <MockTheme>
        <MemoryRouter>
          <LayoutHeader />
        </MemoryRouter>
      </MockTheme>
    )

    expect(screen.getByTestId('layout-header')).toBeInTheDocument()
  })

  it('navigates away on clicking a nav item', async () => {
    const history = createMemoryHistory()

    render(
      <MockTheme>
        <MemoryRouter>
          <LayoutHeader />
        </MemoryRouter>
      </MockTheme>
    )

    const firstNavItem = screen.queryAllByTestId('nav-item')[0]

    fireEvent.click(firstNavItem)

    await waitFor(() => expect(history.location.pathname).toBe('/'))
  })

  it('navigates to home on clicking KASA', async () => {
    const history = createMemoryHistory()

    render(
      <MockTheme>
        <MemoryRouter>
          <LayoutHeader />
        </MemoryRouter>
      </MockTheme>
    )

    fireEvent.click(screen.getByText('KASA'))

    await waitFor(() => expect(history.location.pathname).toBe('/'))
  })
})
