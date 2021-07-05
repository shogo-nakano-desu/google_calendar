import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Schedule = () => {
  let scheduleModel: {
    title: string;
    year: number;
    month: number;
    day: number;
    place: string;
    description: string;
  };

  // scheduleModelの初期化
  scheduleModel = {
    title: '',
    year: 0,
    month: 0,
    day: 0,
    place: '',
    description: '',
  };
  const [schedule, setSchedule] = useState(scheduleModel);
};

export { Schedule };
