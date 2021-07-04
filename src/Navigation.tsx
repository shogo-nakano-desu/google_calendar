import React from 'react';
import ReactDOM from 'react-dom';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Navigation = () => {
  const MainMenu = () => {
    return <MenuIcon></MenuIcon>;
  };

  const Calendar = () => {
    return <CalendarTodayIcon></CalendarTodayIcon>;
  };

  const ArrowBack = () => {
    return <ArrowBackIosIcon></ArrowBackIosIcon>;
  };

  const ArrowForward = () => {
    return <ArrowForwardIosIcon></ArrowForwardIosIcon>;
  };

  return (
    <div>
      <MainMenu />
      <Calendar />
      <h1>カレンダー</h1>
      <button>
        <span>
          <ArrowBack />
        </span>
      </button>
      <button>
        <span>
          <ArrowForward />
        </span>
      </button>
      <div>2021年7月</div>
    </div>
  );
};

export default Navigation;
