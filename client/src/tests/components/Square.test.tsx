import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';

import Square from '../../components/Board/InnerBoard/Square';
import { TileValue } from '../../types/game';

const mockFunction = jest.fn();

const renderOptions = {
  container: document.body.appendChild(document.createElement('tr'))
};

describe('<Square />', () => {
  test('Renders component', () => {
    const { getByTestId } = render(
      <Square makeMove={mockFunction} tileValue={TileValue.Empty} />,
      renderOptions
    );
    const square = getByTestId('game-square');
    expect(square).toHaveClass('cell');
    expect(square).toHaveTextContent('');
  });

  test('Notation class added to component', () => {
    const notationPosition = 'NW';
    const { getByTestId } = render(
      <Square
        makeMove={mockFunction}
        tileValue={TileValue.Empty}
        notationPosition={notationPosition}
      />,
      renderOptions
    );
    const square = getByTestId('game-square');
    expect(square).toHaveClass('cell', notationPosition);
  });

  test('Square is enabled, when tileValue is EMPTY and isActive is true', () => {
    const { getByTestId } = render(
      <Square
        makeMove={mockFunction}
        tileValue={TileValue.Empty}
        isActive={true}
      />,
      renderOptions
    );
    const square = getByTestId('game-square');
    expect(square).toHaveClass('cell', 'enabled');
  });

  test('Square is not enabled, when tileValue is EMPTY and isActive is false', () => {
    const { getByTestId } = render(
      <Square
        makeMove={mockFunction}
        tileValue={TileValue.Empty}
        isActive={false}
      />,
      renderOptions
    );
    const square = getByTestId('game-square');
    expect(square).toHaveClass('cell');
    expect(square).not.toHaveClass('enabled');
  });

  test('Square is not enabled when tileValue is not EMPTY and isActive is true', () => {
    const { getByTestId } = render(
      <Square
        makeMove={mockFunction}
        tileValue={TileValue.Cross}
        isActive={true}
      />,
      renderOptions
    );
    const square = getByTestId('game-square');
    expect(square).toHaveClass('cell');
    expect(square).not.toHaveClass('enabled');
  });

  test('displays X when tileValue is TileValue.Cross', () => {
    const { getByTestId } = render(
      <Square makeMove={mockFunction} tileValue={TileValue.Cross} />,
      renderOptions
    );
    const square = getByTestId('game-square');
    expect(square).toHaveTextContent('X');
  });

  test('fires madeMove function when clicked', () => {
    const { getByTestId } = render(
      <Square makeMove={mockFunction} tileValue={TileValue.Empty} />,
      renderOptions
    );
    const square = getByTestId('game-square');
    fireEvent.click(square);
    expect(mockFunction).toBeCalledTimes(1);
  });

  test('Matches the snapshot', () => {
    const square = create(
      <Square
        makeMove={mockFunction}
        tileValue={TileValue.Circle}
        isActive={false}
        notationPosition="NW"
      />
    );
    expect(square.toJSON()).toMatchSnapshot();
  });
});
