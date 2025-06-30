const router = require('express').Router();
const auth = require('../middlewares/auth');
const Transaction = require('../models/Transaction');

router.get('/category-summary', auth, async (req, res) => {
  const { month, year } = req.query;
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const data = await Transaction.aggregate([
    { $match: { userId: req.user.userId, date: { $gte: start, $lte: end } } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } },
    { $project: { category: '$_id', total: 1, _id: 0 } }
  ]);

  res.json(data);
});

module.exports = router;
