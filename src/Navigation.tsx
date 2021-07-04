import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Navigation = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const MainMenu = () => {
    return <MenuIcon></MenuIcon>;
  };

  const Calendar = () => {
    return <CalendarTodayIcon></CalendarTodayIcon>;
  };

  const ArrowBack = () => {
    const handleClickBack = () => {
      if (month === 1) {
        setMonth(12);
        setYear(year - 1);
      }
      setMonth(month - 1);
    };
    return (
      <button onClick={() => handleClickBack()}>
        <ArrowBackIosIcon />
      </button>
    );
  };

  const ArrowForward = () => {
    const handleClickForward = () => {
      if (month === 12) {
        setMonth(1);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    };
    return (
      <button onClick={() => handleClickForward()}>
        <ArrowForwardIosIcon />
      </button>
    );
  };

  const DateNav = () => {
    return (
      <div>
        {year}年{month}月
      </div>
    );
  };
  return (
    <div>
      <MainMenu />
      <Calendar />
      <h1>カレンダー</h1>

      <span>
        <ArrowBack />
      </span>
      <span>
        <ArrowForward />
      </span>
      <div>
        <DateNav />
      </div>
    </div>
  );
};

export default Navigation;
