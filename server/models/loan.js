import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  name: { type: 'String', required: true },
});

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;

export async function count() {
  let size = 0;
  try {
    await Loan.count({}, (err, c) => { size = c; });
  } catch (err) {
    console.error(err);
  }
  return size;
}
