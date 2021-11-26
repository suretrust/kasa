import { render, screen } from '@testing-library/react'

import NoData from '.'

const props = {
  text: 'No data available'
}

describe('NoData component', () => {
  it('has a component with data test id of no-data', () => {
    render(<NoData {...props} />)

    expect(screen.getByTestId('no-data')).toBeInTheDocument()
  })

  it('has text props value displayed', () => {
    render(<NoData {...props} />)

    expect(screen.getByText(props.text)).toBeInTheDocument()
  })
})
