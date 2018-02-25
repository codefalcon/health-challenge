import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  loan_id: { type: 'ObjectId', ref: 'Loan', required: true },
  created_at: { type: 'Date', required: true },
  type: { type: 'String', enum: ['REPAYMENT', 'REPAYMENT_DECLINED'], required: true },
  seq_id: { type: 'Number', required: true },
  health: { type: 'Number', required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction

export async function unhealthyList() {
  var list = [];
  try {
      await Transaction.aggregate([
        { $group: { _id: {loan_id: "$loan_id"},
                    curr_week: {$max: "$seq_id"},
                    curr_health: {$last: "$health"},
                    health: {$push: "$health"}}},
        { $sort: {"curr_health": 1}},
        { $limit: 10}]).
        then(function(res){
        list = res;
        });
    }
    catch(err) {
      console.error(err);
    }

    return list;
};
