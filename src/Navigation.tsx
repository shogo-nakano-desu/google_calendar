import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MenuIcon from '@material-ui/icons/Menu';

export const Navigation = () => {
  const MainMenu = () => {
    return <MenuIcon></MenuIcon>;
  };

  const Calendar = () => {
    return <CalendarTodayIcon></CalendarTodayIcon>;
  };

  return (
    <div>
      <MainMenu />
      <Calendar />
      <h1>カレンダー</h1>
    </div>
  );
};
