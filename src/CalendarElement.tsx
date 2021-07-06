import React, { Fragment, useState } from 'react';
import { Navigation } from './Navigation';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

// 曜日要素をレンダーするための関数を作成
// [TODO]全体を通してだが、スタイリングは後からまとめてやる必要あり
const CreateDays: React.VFC = () => {
  const gridSize = {
    width: '14.2857%',
    height: 'auto',
    padding: '0px',
  };
  return (
    <>
      <li style={gridSize}>
        <div>日</div>
      </li>
      <li style={gridSize}>
        <div>月</div>
      </li>
      <li style={gridSize}>
        <div>火</div>
      </li>
      <li style={gridSize}>
        <div>水</div>
      </li>
      <li style={gridSize}>
        <div>木</div>
      </li>
      <li style={gridSize}>
        <div>金</div>
      </li>
      <li style={gridSize}>
        <div>土</div>
      </li>
    </>
  );
};

// [TODO]本当はReact.VFCで型を定義したいが、エラーになるのでいったん放置している。。
export const CalendarCalculator = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [weeksArray, setWeeksArray] = useState<WeeksArray>([]);
  type ScheduleMetadata = {
    title: string;
    place: string;
    description: string;
  };
  interface ScheduleModel<T = ScheduleMetadata> {
    year: number;
    month: number;
    day: number;
    schedules: Array<T>;
  }

  type Week = [ScheduleModel, ScheduleModel, ScheduleModel, ScheduleModel, ScheduleModel, ScheduleModel, ScheduleModel];
  type WeeksArray = Week[];

  const ArrowBack = () => {
    const handleClickBack = () => {
      if (month === 1) {
        setMonth(12);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
      setWeeksArray([]);
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
      setWeeksArray([]);
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
  // 該当月が何日間ある月なのかを返す関数
  const determineDaysInTheMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  // １ヶ月の中に何個の配列があればいいのか計算するための関数
  const calculateNumberOfWeeks = (year: number, month: number): number => {
    // 日曜０、月曜１、・・・土曜６
    const firstDay: number = new Date(year, month - 1, 1).getDay(); // 1日の曜日
    console.log(`firstDay : ${firstDay}`);
    // 条件分岐で書くコードを簡潔にするために切り出した関数
    // 1ヶ月が何週間あるのか判定する
    const weekNumCalc = (firstWeekNum: number) => {
      return Math.ceil((determineDaysInTheMonth(year, month) - firstWeekNum) / 7) + 1;
    };

    if (firstDay === 0) {
      return weekNumCalc(7);
    } else if (firstDay === 1) {
      return weekNumCalc(6);
    } else if (firstDay === 2) {
      return weekNumCalc(5);
    } else if (firstDay === 3) {
      return weekNumCalc(4);
    } else if (firstDay === 4) {
      return weekNumCalc(3);
    } else if (firstDay === 5) {
      return weekNumCalc(2);
    } else {
      return weekNumCalc(1);
    }
  };

  // カレンダーの配列を生成する関数
  const createArrayForCalendar = (year: number, month: number) => {
    let schedule: ScheduleModel = {
      year: year,
      month: month,
      day: 0,
      schedules: [
        {
          title: '',
          place: '',
          description: '',
        },
      ],
    };
    let oneWeek: Week = [
      { ...schedule },
      { ...schedule },
      { ...schedule },
      { ...schedule },
      { ...schedule },
      { ...schedule },
      { ...schedule },
    ];
    // let weeksArray: WeeksArray = [];

    // １日が何曜日かチェックするための関数
    const firstDay: number = new Date(year, month - 1, 1).getDay();

    let dateCalc: number = 1;

    const addWeek = (weekNum: Week) => {
      weeksArray.push(weekNum);
      return weeksArray;
    };

    for (let i = 0; i < calculateNumberOfWeeks(year, month); i++) {
      // 最初の週か、翌週以降かで処理を分ける
      // 最初の週
      if (i === 0) {
        for (let t = firstDay; t < 7; t++) {
          oneWeek[t].day = dateCalc;
          dateCalc += 1;
        }
        // [TODO]配列の中で０が格納されている箇所に対して、前の月の日付を入れていく必要がある
        weeksArray.push(oneWeek);
        console.log(`1週目が終わったときのweeksArray: ${weeksArray}`);
        // ２週目以降
      } else if (i === 1) {
        let weekTwo: Week = [
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
        ];
        for (let t = 0; t < 7; t++) {
          weekTwo[t].day = dateCalc;
          dateCalc += 1;
        }
        weeksArray.push(weekTwo);
      } else if (i === 2) {
        let weekThree: Week = [
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
        ];
        for (let t = 0; t < 7; t++) {
          weekThree[t].day = dateCalc;
          dateCalc += 1;
        }
        weeksArray.push(weekThree);
      } else if (i === 3) {
        let weekFour: Week = [
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
        ];
        for (let t = 0; t < 7; t++) {
          weekFour[t].day = dateCalc;
          dateCalc += 1;
        }
        weeksArray.push(weekFour);
      } else if (i === 4) {
        let weekFive: Week = [
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
        ];
        if (calculateNumberOfWeeks(year, month) === 5) {
          const lastdateCalc = dateCalc;
          for (let t = 0; t < determineDaysInTheMonth(year, month) - lastdateCalc + 1; t++) {
            weekFive[t].day = dateCalc;
            dateCalc += 1;
          }
        } else {
          for (let t = 0; t < 7; t++) {
            weekFive[t].day = dateCalc;
            dateCalc += 1;
          }
        }
        weeksArray.push(weekFive);
      } else if (i === 5) {
        let weekSix: Week = [
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
          { ...schedule },
        ];
        const lastdateCalc = dateCalc;
        for (let t = 0; t < determineDaysInTheMonth(year, month) - lastdateCalc + 1; t++) {
          weekSix[t].day = dateCalc;
          dateCalc += 1;
        }
        weeksArray.push(weekSix);
      } else {
        console.log(new Error());
      }
    }
    // console.log(`2021/07/06の配列をテスト${weeksArray[1][2]}`);
    () => setWeeksArray(weeksArray);
    return weeksArray;
  };

  const calendar = createArrayForCalendar(year, month);
  console.log(calendar);

  return (
    <div>
      <div>
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
      <div>
        {/* <ul> ここでグリッドをかく */}
        <ul>
          <CreateDays />
        </ul>
      </div>
      <Fragment>
        {/* <table>
          <tbody>
            {calendar.map((week, i) => (
              <tr key={week.join('')}>
                {week.map((day, j) => (
                  <th key={`${i}${j}`}>{day.day}</th>
                ))}
              </tr>
            ))}
          </tbody>
        </table> */}
        {calendar.map((week, i) => week.map((day, j) => <li key={`${i}${j}`}>{day.day}</li>))}
      </Fragment>
    </div>
  );
};

export default CalendarCalculator;
