// 該当月が何日間ある月なのかを返す関数
export const determineDaysInTheMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

// // 月に対応する数字をinterfaceとして宣言する
// interface Month {
//   readonly January: number;
//   readonly February: number;
//   readonly March: number;
//   readonly April: number;
//   readonly May: number;
//   readonly June: number;
//   readonly July: number;
//   readonly August: number;
//   readonly September: number;
//   readonly October: number;
//   readonly November: number;
//   readonly December: number;
// }

// let month: Month;
// month = {
//   January: 1,
//   February: 2,
//   March: 3,
//   April: 4,
//   May: 5,
//   June: 6,
//   July: 7,
//   August: 8,
//   September: 9,
//   October: 10,
//   November: 11,
//   December: 12,
// };
