const router = require('express').Router();
const auth = require('../middlewares/auth');
const Transaction = require('../models/Transaction');

router.get('/summary', auth, async (req, res) => {
  const { month, year } = req.query;
  const userId = req.user.userId;

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const txns = await Transaction.find({ userId, date: { $gte: start, $lte: end } });

  let totalIncome = 0, totalExpense = 0;
  txns.forEach(t => {
    if (t.type === 'Income') totalIncome += t.amount;
    else totalExpense += t.amount;
  });

  res.json({
    balance: totalIncome - totalExpense,
    totalIncome,
    totalExpense,
    recentTransactions: txns.slice(-5).reverse()
  });
});

module.exports = router;
