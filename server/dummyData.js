import Loan from './models/loan';
import Transaction from './models/transaction';

const firstName = [
  'Pauls',
  'Beeshals',
  'Luizs',
  'Nicks',
  'Annas',
  'Yanirs',
  'Schmuckys',
];
const adjective = [
  'Awesome',
  'Pitiful',
  'Great',
  'Cool',
  'Beautiful',
  'Above Average',
];
const type = [
  'Pizzeria',
  'Pub',
  'Bakery',
  'Cafe',
];

function getRandomWeeks() {
  return Math.floor(Math.random() * 40) + 13;
}

function roundTo4Decimals(numberToRound) {
  return Math.round(numberToRound * 10000) / 10000;
}

async function populateData() {
  // loop tings
  for (let count = 0; count < 1000; count++) {
    // take first thing off queue
    const first = firstName.shift();
    const second = adjective.shift();
    const third = type.shift();

    const loan = await Loan.create({
      name: `${first} ${second} ${third}`,
    });

    // Put back on queue
    firstName.push(first);
    adjective.push(second);
    type.push(third);

    let transactionCount = getRandomWeeks();
    let seq = 0;
    let prevHealth = 0;
    while (transactionCount !== 0) {
      const today = new Date();
      const transactionDate = new Date(today.setTime(today.getTime() + (7 * seq) * 86400000));
      let computedHealth = 0;
      if (count < 333) {
        computedHealth = roundTo4Decimals((prevHealth * seq + 1) / (seq + 1));
        await Transaction.create({
          loan_id: loan._id,
          seq_id: seq,
          created_at: transactionDate,
          type: 'REPAYMENT',
          health: computedHealth,
        });
      } else if ((count < 666 && seq <= transactionCount / 2) || (count >= 666 && seq >= transactionCount / 2)) {
        computedHealth = roundTo4Decimals((prevHealth * seq + 1) / (seq + 1));
        await Transaction.create({
          loan_id: loan._id,
          seq_id: seq,
          created_at: transactionDate,
          type: 'REPAYMENT',
          health: computedHealth,
        });
      } else if ((count < 666 && seq >= transactionCount / 2) || (count >= 666 && seq <= transactionCount / 2)) {
        computedHealth = roundTo4Decimals((prevHealth * seq) / (seq + 1));
        await Transaction.create({
          loan_id: loan._id,
          seq_id: seq,
          created_at: transactionDate,
          type: 'REPAYMENT_DECLINED',
          health: computedHealth,
        });
      }
      prevHealth = computedHealth;
      seq++;
      transactionCount--;
    }
  }
}


export default async function () {
  try {
    const count = await Loan.count().exec();
    if (count > 0) {
      return;
    }

    await populateData();
  } catch (err) {
    console.log(err);
  }
}
