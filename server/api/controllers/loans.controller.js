import moment from 'moment';
import Loan from '../../models/loan';
import { unhealthyList } from '../../models/transaction';

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

function getPercentage(number) {
  return Math.round(number * 10000) / 100;
}

/**
 * Get all Loans from DB
 * @param req
 * @param res
 * @returns void
 */
export async function getLoansFromDb(req, res) {
  const respJson = [];
  const perPage = 10;
  const pageNum = req.params.pagenum || 1;
  const totalRecords = await Loan.count();

  try {
    const loans = await unhealthyList(pageNum,perPage);
    loans.forEach(loanItem => {
      respJson.push(
        {
          name: loanItem._id.loan_id,
          currentHealth: getPercentage(loanItem.curr_health),
          health: loanItem.health.map((val) => getPercentage(val)),
        });
    });
  } catch (err) {
    console.log(err);
  }
  return res.send({
    loans: respJson,
    currentPage: pageNum,
    totalPages: Math.ceil(totalRecords / perPage),
  });
}
