import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import Layout from '.'
import MockTheme from '../../testUtils/mockTheme'

const props = {
  children: <div />
}

describe('Layout component', () => {
  it('has a component with data test id of layout', () => {
    render(
      <MockTheme>
        <MemoryRouter>
          <Layout {...props} />
        </MemoryRouter>
      </MockTheme>
    )

    expect(screen.getByTestId('layout')).toBeInTheDocument()
  })
})
