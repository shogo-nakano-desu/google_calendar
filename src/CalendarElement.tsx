import React, { Fragment, useState } from 'react';
import { Navigation } from './Navigation';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CloseIcon from '@material-ui/icons/Close';
import PlaceIcon from '@material-ui/icons/Place';
import NotesIcon from '@material-ui/icons/Notes';
import styled from 'styled-components';
import getWeekOfMonth from 'date-fns/getWeekOfMonth';
import getDay from 'date-fns/getDay';

// [TODO]スタイリングはこれからやる必要あり。。。
export const AddScheduleDialog = (props: any) => {
  type FormModel = {
    title: string;
    year: number;
    month: number;
    day: number;
    place: string;
    description: string;
  };
  const formInit: FormModel = {
    title: '',
    year: 0, // デフォルトでクリックした日付を入れるようにしたい
    month: 0,
    day: 0,
    place: '',
    description: '',
  };

  const [input, setInput] = useState<FormModel>(formInit);
  // formの内容を全部一気にweeksArrayに突っ込むようの関数。保存buttonと一緒に使う
  const registerForm = () => {
    // targetDateは2021年7月7日のようなデータが入っている
    // 以下でまずは年月日を別々に取得して、inputに突っ込む用意
    const targetDate: string = document.getElementById('addScheduleDate')!.innerText;
    const year = parseInt(targetDate.match(/[0-9]{4}/)![0]);
    const month = parseInt(targetDate.match(/(?<!.{5})[0-9]{1,}/)![0]);
    const day = parseInt(targetDate.match(/[0-9]{1,}(?=日)/)![0]);
    // inputに取得したデータを入れていく
    input.year = year;
    input.month = month;
    input.day = day;
    setInput(input);

    // 年月日からその日がn週目のなかで、m日目なのかを判定
    const determineWeekIndex = getWeekOfMonth(new Date(year, month - 1, day)); // n
    const determineDayIndex = getDay(new Date(year, month - 1, day)); // m
    const formInput = {
      title: input.title,
      place: input.place,
      description: input.description,
    };
    props.weeksArray[determineWeekIndex][determineDayIndex].schedules.push(formInput);
    () => props.setWeeksArray(props.weeksArray);
    // 最後に初期化するために処理
    setInput(formInit);
  };

  const SpaceAndDelete = () => {
    return (
      <div>
        <div>
          <button>
            <span>
              <CloseIcon />
            </span>
            <span></span>
          </button>
        </div>
      </div>
    );
  };

  const AddScheduleTitle = () => {
    return (
      <div>
        <input
          placeholder='タイトルと日時を追加'
          type='text'
          className='MuiInputBase-input MuiInput-input'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            input.title = e.target.value;
            setInput(input);
          }}
        />
      </div>
    );
  };

  // [TODO]日付はカレンダーから常に選ぶようになっている。
  // 日付をクリックすると、小さいカレンダーが出てきて選べるように。
  // 小さいカレンダーは大きなカレンダーと同じものを使えばよさそう。見た目をちょっと変えるだけ
  // readOnly要素をつけて読み取り専用にする。そしてどこかをいじって選択しているセルのyear, monthをとってくるようにする
  const AddScheduleDate = () => {
    return (
      <div>
        <div>
          <AccessTimeIcon />
        </div>
        <div>
          <div>
            <div>
              <input
                id='addScheduleDate'
                className='MuiInputBase-input MuiInput-input'
                aria-invalid='false'
                type='text'
                readOnly
                value='2021年7月7日'
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddSchedulePlace = () => {
    return (
      <div>
        <div>
          <PlaceIcon />
        </div>
        <div>
          <div>
            <div>
              <input
                aria-invalid='false'
                placeholder='場所を追加'
                type='text'
                className='MuiInputBase-input MuiInput-input'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  input.place = e.target.value;
                  setInput(input);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddScheduleDescription = () => {
    return (
      <div>
        <div>
          <NotesIcon />
        </div>
        <div>
          <div>
            <div>
              <input
                aria-invalid='false'
                placeholder='説明を追加'
                type='text'
                className='MuiInputBase-input MuiInput-input'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  input.description = e.target.value;
                  setInput(input);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SpaceAndSave = () => {
    return (
      <div>
        <button
          className='MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary'
          tabIndex={0}
          type='button'
          onClick={() => registerForm}
        >
          <span className='MuiButton-label'>保存</span>
          <span className='MuiTouchRipple-root'></span>
        </button>
      </div>
    );
  };

  return (
    <div className='MuiDialog-root' style={{ position: 'fixed', zIndex: 1300, inset: '0px' }}>
      <div className='MuiBackdrop-root' aria-hidden='true'>
        <div className='MuiDialog-container MuiDialog-scrollPaper' role='none presentation'>
          <div>
            <SpaceAndDelete />
          </div>
          <div>
            <AddScheduleTitle />
            <AddScheduleDate />
            <AddSchedulePlace />
            <AddScheduleDescription />
          </div>
          <div>
            <SpaceAndSave />
          </div>
        </div>
      </div>
    </div>
  );
};

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
