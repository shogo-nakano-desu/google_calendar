import React, { Fragment, useState } from 'react';

// [TODO]本当はReact.VFCで型を定義したいが、エラーになるのでいったん放置している。。
const CalendarCalculator = () => {
  // 該当月が何日間ある月なのかを返す関数
  const determineDaysInTheMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  // １ヶ月の中に何個の配列があればいいのか計算するための関数
  const calculateNumberOfWeeks = (year: number, month: number): number => {
    const firstDay: number = new Date(year, month, 1).getDay();
    // 条件分岐で書くコードを簡潔にするために切り出した関数
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
    // 最初に全て０で埋めておかないと、ループを回す際にコンパイルエラーになるため。
    let oneWeek: [number, number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0, 0];
    let weeksArray: [number, number, number, number, number, number, number][] = [];

    // １日が何曜日かチェックするための関数
    const firstDay: number = new Date(year, month - 1, 1).getDay();
    // firstDayの問題は解けた。
    console.log(`firstDay（2021/07だと４のはず）: ${firstDay}`);
    let dateculc: number = 1;
    for (let i = 0; i < calculateNumberOfWeeks(year, month); i++) {
      // 最初の週か、翌週以降かで処理を分ける
      // 最初の週
      if (i === 0) {
        console.log('first week calc');
        for (let t = firstDay; t < 7; t++) {
          console.log(`t is ${t} now`);
          oneWeek[t] = dateculc;
          dateculc += 1;
        }
        // [TODO]配列の中で０が格納されている箇所に対して、前の月の日付を入れていく必要がある
        console.log('誤作動チェック');
        weeksArray.push(oneWeek);
        console.log(`1週目が終わったときのweeksArray: ${weeksArray}`);
        // ２週目以降
      } else {
        console.log(`${i + 1}週目の計算スタート`);
        console.log(`weeksArrayチェック：${weeksArray}`);
        for (let t = 0; t < 7; t++) {
          oneWeek[t] = dateculc;
          console.log(`oneWeek[${t}]: ${oneWeek[t]}`);
          dateculc += 1;
        }
        console.log(`${i + 1}週目が終わったときのoneWeek: ${oneWeek}`);
        console.log(`${i + 1}週目が終わって、pushする前のweeksArray${weeksArray}`);
        weeksArray.push(oneWeek);
        console.log(`${i + 1}週目が終わって、pushした後のweeksArray${weeksArray}`);
      }
    }
    console.log(weeksArray);
    return weeksArray;
  };

  const calendar = createArrayForCalendar(2021, 7);
  console.log(calendar);
  return (
    <Fragment>
      <table>
        <tbody>
          {calendar.map((week, i) => {
            <tr key={week.join('')}>
              {calendar.map((day, j) => {
                <th key={`${i}${j}`}>{day}</th>;
              })}
            </tr>;
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default CalendarCalculator;
