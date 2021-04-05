import { render, screen, cleanup } from '@testing-library/react'
import AlertModal from '../AlertModal'

test('should render todo component', () => {
    render(<AlertModal />)
    const todo = screen.getByTestId('testBox');
    expect(todo).toBeInTheDocument();
    expect(todo).toHaveTextContent('Confirmation') // text present in the div with id todoId
})