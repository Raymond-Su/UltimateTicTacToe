import Styled from 'styled-components';

export const StyledPanel = Styled.div`
   margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
`;

export const StyledPanelHeading = Styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
`;

export const StyledPanelTitle = Styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  color: inherit;
`;

export const StyledPanelBody = Styled.div`
  padding: 15px;
  &::before {
    display: table;
    content: ' ';
  }
  &::after {
    clear: both;
  }
`;
