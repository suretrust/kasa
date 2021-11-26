import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import Loader from '.'
import MockTheme from '../../testUtils/mockTheme'

describe('Loader component', () => {
  it('has a component with data test id of loading', () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <Loader />
        </MockTheme>
      </MemoryRouter>
    )

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
})
