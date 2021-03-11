import Styled from 'styled-components';

export const StyledContainer = Styled.div`
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;

  @media (min-width: 992px) {
    min-width: 970px;
  }
`;

export const StyledResizeableLargeColumn = Styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;

  @media (min-width: 992px) {
    width: 66.666667%;
    float: left;
    left: 33.33333333%;
`;

export const StyledResizeableSmallColumn = Styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  
  @media (min-width: 992px) {
    width: 33.333333%;
    float: left;
    right: 66.66666667%;
  }
`;
