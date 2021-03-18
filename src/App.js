import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  ContainerStyled, LabelStyled, SearchInputStyled, SearchContainerStyled,
  CalendarContainerStyled, ItemContainerStyled, DayStyled
} from './styles';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions as wheatherActions, selectors as wheatherSelectors } from './reducers/wheather'
const gsDayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const CalendarItemStyled = ({ info }) => {
  if (typeof info.data === 'undefined') {
    return (
      <ItemContainerStyled>
        <LabelStyled>Can not get forecast</LabelStyled>
      </ItemContainerStyled>
    )
  }
  const { datetime, max_temp, min_temp } = info.data[0];
  var d = new Date(datetime);
  var dayName = gsDayNames[d.getDay()];
  return (
    <ItemContainerStyled>
      <LabelStyled>{dayName}</LabelStyled>
      <LabelStyled>Min: {min_temp}</LabelStyled>
      <LabelStyled>Max: {max_temp}</LabelStyled>
    </ItemContainerStyled>
  )
}

const SearchComponent = () => {
  const dispatch = useDispatch();
  const searchingFnc = useCallback((evt) => {
    dispatch(wheatherActions.searchingRequest(evt.target.value))
  }, [dispatch])
  return (
    <SearchContainerStyled>
      <LabelStyled>Search</LabelStyled>
      <SearchInputStyled type="text" onChange={searchingFnc} />
    </SearchContainerStyled>
  )
}
const MainComponent = React.memo(() => {
  const wheather = useSelector(wheatherSelectors.getWheather);
  const error = useSelector(wheatherSelectors.getError);
  return (<ContainerStyled>
    <SearchComponent />
    {
       !wheather.length && error === ''  && (
        <CalendarContainerStyled>
          <LabelStyled>Something wrong, please try again</LabelStyled>
        </CalendarContainerStyled>
      )
    }
    {
      !!wheather.length && !error && (
        <CalendarContainerStyled>
          {wheather.map(info => <CalendarItemStyled info={info} />)}
        </CalendarContainerStyled>
      )
    }
  </ContainerStyled>)
})

function App() {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>

  );
}

export default App;
