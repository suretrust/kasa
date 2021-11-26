import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import AddDoorModal from '.'
import MockTheme from '../../testUtils/mockTheme'

const props = {
  showForm: true,
  handleHideForm: jest.fn(),
  groupId: 34343,
  placeId: 43423,
  setSnackMsg: jest.fn
}

describe('AddDoorModal component', () => {
  it('has a component with data test id of add-door-modal', () => {
    render(
      <MockTheme>
        <MemoryRouter>
          <AddDoorModal {...props} />
        </MemoryRouter>
      </MockTheme>
    )

    expect(screen.getByTestId('add-door-modal')).toBeInTheDocument()
  })

  it('renders add doors', () => {
    render(
      <MockTheme>
        <MemoryRouter>
          <AddDoorModal {...props} />
        </MemoryRouter>
      </MockTheme>
    )

    expect(screen.getByText('Add Doors')).toBeInTheDocument()
  })
})
