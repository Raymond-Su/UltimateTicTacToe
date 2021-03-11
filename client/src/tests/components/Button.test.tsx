import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';

import Button from '../../components/Button';

const mockFunction = jest.fn();

describe('<Button />', () => {
  test('Renders component', () => {
    const { getByTestId } = render(<Button />);
    const button = getByTestId('btn');
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toHaveClass('btn');
    expect(button).not.toHaveClass('btn-primary');
  });

  test('styled correctly when primary property is applied', () => {
    const { getByTestId } = render(<Button primary />);
    const button = getByTestId('btn');
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  test('btn to have id when id property is applied', () => {
    const { getByTestId } = render(<Button id="test-id" />);
    const button = getByTestId('btn');
    expect(button).toHaveAttribute('id', 'test-id');
  });

  test('renders children', () => {
    const { getByTestId } = render(
      <Button>
        <p data-testid="children">Children</p>
      </Button>
    );
    const button = getByTestId('btn');
    const children = getByTestId('children');
    expect(button).toContainElement(children);
  });

  test('handles function call when onClick property is added', () => {
    const { getByTestId } = render(<Button onClick={mockFunction} />);
    const button = getByTestId('btn');
    fireEvent.click(button);
    expect(mockFunction).toBeCalledTimes(1);
  });

  test('Matches the snapshot', () => {
    const button = create(
      <Button onClick={mockFunction} primary id="snapshot-btn">
        Snapshot Button
      </Button>
    );
    expect(button.toJSON()).toMatchSnapshot();
  });
});
