import { render, screen, fireEvent } from '@testing-library/react'
import CustomAlert from '.'

const props = {
  message: 'Custom message',
  setMessage: jest.fn(),
  setBackgroundColor: jest.fn(),
  backgroundColor: 'brown'
}

describe('CustomAlert component', () => {
  it('has a component with data test id of custom-alert', () => {
    render(<CustomAlert {...props} />)

    expect(screen.getByTestId('custom-alert')).toBeInTheDocument()
  })

  it('contains message text', () => {
    render(<CustomAlert {...props} />)

    expect(screen.getByTestId('custom-alert')).toHaveTextContent(props.message)
  })

  it('has no component with data test id of custom-alert when message is null', () => {
    const newProps = { ...props, message: '' }
    render(<CustomAlert {...newProps} />)

    expect(screen.queryByTestId('custom-alert')).not.toBeInTheDocument()
  })

  it('calls setMessage & setBackgroundColor on clicking the close icon', () => {
    render(<CustomAlert {...props} />)
    fireEvent.click(screen.getByTestId('close-custom-alert'))

    expect(props.setMessage).toHaveBeenCalled()
    expect(props.setBackgroundColor).toHaveBeenCalled()
  })
})
