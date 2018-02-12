import moment from 'moment';

/**
 * Get all Loans
 * @param req
 * @param res
 * @returns void
 */
export function getLoans(req, res) {
  // This is just sample data. Please structure your code in the best way possible. Don't feel obliged to stick to this structure
  return res.send([
    {
      name: 'Nick Tong\'s Salad Tong Store',
      currentHealth: 84,
      health: {
        dates: [
          moment('2017/12/01', 'YYYY/MM/DD').toDate(),
          moment('2017/12/08', 'YYYY/MM/DD').toDate(),
          moment('2017/12/15', 'YYYY/MM/DD').toDate(),
          moment('2017/12/22', 'YYYY/MM/DD').toDate(),
          moment('2017/12/29', 'YYYY/MM/DD').toDate(),
          moment('2018/01/05', 'YYYY/MM/DD').toDate(),
          moment('2018/01/12', 'YYYY/MM/DD').toDate(),
          moment('2018/01/19', 'YYYY/MM/DD').toDate(),
          moment('2018/01/26', 'YYYY/MM/DD').toDate(),
          moment('2018/02/02', 'YYYY/MM/DD').toDate(),
          moment('2018/02/09', 'YYYY/MM/DD').toDate(),
          moment('2018/02/16', 'YYYY/MM/DD').toDate(),
          moment('2018/02/13', 'YYYY/MM/DD').toDate(),
        ],
        values: [
          100, // successful payment
          100,
          100,
          100,
          100,
          100,
          100,
          100,
          100,
          90, // decline
          81, // decline
          83, // successful payment
          83, // decline
          84, // successful payment
        ],
      },
    },
    {
      name: 'Paul\'s Pizzeria',
      currentHealth: 23,
      health: {
        dates: [
          moment('2017/12/01', 'YYYY/MM/DD').toDate(),
          moment('2017/12/08', 'YYYY/MM/DD').toDate(),
          moment('2017/12/15', 'YYYY/MM/DD').toDate(),
          moment('2017/12/22', 'YYYY/MM/DD').toDate(),
          moment('2017/12/29', 'YYYY/MM/DD').toDate(),
          moment('2018/01/05', 'YYYY/MM/DD').toDate(),
          moment('2018/01/12', 'YYYY/MM/DD').toDate(),
          moment('2018/01/19', 'YYYY/MM/DD').toDate(),
          moment('2018/01/26', 'YYYY/MM/DD').toDate(),
          moment('2018/02/02', 'YYYY/MM/DD').toDate(),
          moment('2018/02/09', 'YYYY/MM/DD').toDate(),
          moment('2018/02/16', 'YYYY/MM/DD').toDate(),
          moment('2018/02/13', 'YYYY/MM/DD').toDate(),
        ],
        values: [
          100, // successful payment
          50, // decline
          66, // successful payment
          50, // decline
          66, // successful payment
          50, // decline
          43, // decline
          38, // decline
          33, // decline
          30, // decline
          27, // decline
          25, // decline
          23, // decline
        ],
      },
    },
  ]);
}
