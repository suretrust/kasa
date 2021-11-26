import { render, screen, fireEvent } from '@testing-library/react'
import DoorItem from '.'
import MockTheme from '../../testUtils/mockTheme'

const props = {
  door: { name: 'Door name', description: 'Door description' },
  handleDeleteDoor: jest.fn(),
  doorObjectId: 12434,
  isDeleting: 12434
}

describe('DoorItem component', () => {
  it('has a component with data test id of door-item', () => {
    render(
      <MockTheme>
        <DoorItem {...props} />
      </MockTheme>
    )

    expect(screen.getByTestId('door-item')).toBeInTheDocument()
  })

  it('has door name and description', () => {
    render(
      <MockTheme>
        <DoorItem {...props} />
      </MockTheme>
    )

    expect(screen.getByText(props.door.name)).toBeInTheDocument()
    expect(screen.getByText(props.door.description)).toBeInTheDocument()
  })

  it('has "no description" when description props is empty', () => {
    const newProps = { ...props, door: { name: 'Door name', description: '' } }
    render(
      <MockTheme>
        <DoorItem {...newProps} />
      </MockTheme>
    )

    expect(screen.getByText('No description')).toBeInTheDocument()
  })

  it('shows in progress when isDeleting === doorObjectId', () => {
    render(
      <MockTheme>
        <DoorItem {...props} />
      </MockTheme>
    )

    expect(screen.getByTestId('in-progress')).toBeInTheDocument()
  })

  it('hides in progress when isDeleting !== doorObjectId', () => {
    const newProps = { ...props, isDeleting: 3454 }
    render(
      <MockTheme>
        <DoorItem {...newProps} />
      </MockTheme>
    )

    expect(screen.queryByTestId('in-progress')).not.toBeInTheDocument()
  })

  it('calls handleDeleteDoor on clicking unassign door', () => {
    render(
      <MockTheme>
        <DoorItem {...props} />
      </MockTheme>
    )

    fireEvent.click(screen.getByTestId('in-progress'))

    expect(props.handleDeleteDoor).toHaveBeenCalled()
  })
})
