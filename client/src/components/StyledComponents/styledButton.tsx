import Styled from 'styled-components';

interface styledButtonProps {
  primary?: boolean;
}

export const StyledButton = Styled.button<styledButtonProps>`
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: ${(props) => (props.primary ? '#fff' : 'initial')};
  background-color: ${(props) => (props.primary ? '#337ab7' : 'initial')};
  border-color:  ${(props) => (props.primary ? '#2e6da4;' : 'initial')};
`;
