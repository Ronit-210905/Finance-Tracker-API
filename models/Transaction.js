const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: Date,
  description: String,
  amount: Number,
  category: String,
  type: { type: String, enum: ['Income', 'Expense'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('Transaction', transactionSchema);
