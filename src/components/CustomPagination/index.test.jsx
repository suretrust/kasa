import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import CustomPagination from '.'
import { PAGINATION_LIMIT } from '../../constants/paginationLimit'

const props = {
  pagination: { count: 122, limit: PAGINATION_LIMIT },
  handlePaginationCallback: jest.fn(),
  setPage: jest.fn(),
  page: 3
}

describe('CustomPagination component', () => {
  it('has a component with data test id of custom-pagination', () => {
    render(
      <MemoryRouter>
        <CustomPagination {...props} />
      </MemoryRouter>
    )

    expect(screen.getByTestId('custom-pagination')).toBeInTheDocument()
  })

  it('calls setPage & handlePaginationCallback on clicking page 2', () => {
    render(
      <MemoryRouter>
        <CustomPagination {...props} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('2'))

    expect(props.setPage).toHaveBeenCalled()
    expect(props.handlePaginationCallback).toHaveBeenCalled()
  })
})
