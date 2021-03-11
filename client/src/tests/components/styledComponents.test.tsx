import { render } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';

import { StyledButton } from '../../components/StyledComponents/styledButton';

const mockFunction = jest.fn();

describe('Styled components', () => {
  describe('<StyledButton />', () => {
    test('Renders component', () => {
      const { getByTestId } = render(<StyledButton data-testid="btn" />);
      const button = getByTestId('btn');
      expect(button).toBeInstanceOf(HTMLButtonElement);
    });

    test('primary props changes style', () => {
      const { getByTestId } = render(
        <StyledButton data-testid="btn" primary />
      );
      const button = getByTestId('btn');
      expect(button).toHaveStyle('color: #fff');
    });

    test('Matches the snapshot', () => {
      const button = create(
        <StyledButton onClick={mockFunction} primary id="snapshot-btn">
          Snapshot Button
        </StyledButton>
      );
      expect(button.toJSON()).toMatchSnapshot();
    });
  });
});
