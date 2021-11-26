import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { createMemoryHistory } from 'history'

import GroupItem from '.'
import MockTheme from '../../testUtils/mockTheme'

const props = {
  group: {
    locksCount: 3,
    description: 'Group description',
    name: 'Group name'
  }
}

describe('GroupItem component', () => {
  it('has a component with data test id of group-item', () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <GroupItem {...props} />
        </MockTheme>
      </MemoryRouter>
    )

    expect(screen.getByTestId('group-item')).toBeInTheDocument()
  })

  it('has description text', () => {
    render(
      <MemoryRouter>
        <MockTheme>
          <GroupItem {...props} />
        </MockTheme>
      </MemoryRouter>
    )

    expect(screen.getByText(props.group.description)).toBeInTheDocument()
  })

  it('has "no description" text when description props is empty', () => {
    const newProps = { group: { ...props.group, description: '' } }
    render(
      <MemoryRouter>
        <MockTheme>
          <GroupItem {...newProps} />
        </MockTheme>
      </MemoryRouter>
    )

    expect(screen.getByText('No description')).toBeInTheDocument()
  })

  it('navigates away on clicking a group item', async () => {
    const history = createMemoryHistory()

    render(
      <MemoryRouter>
        <MockTheme>
          <GroupItem {...props} />
        </MockTheme>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('group-item'))

    await waitFor(() => expect(history.location.pathname).toBe('/'))
  })
})
