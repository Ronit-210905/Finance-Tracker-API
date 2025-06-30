const router = require('express').Router();
const auth = require('../middlewares/auth');
const Transaction = require('../models/Transaction');

// Create
router.post('/', auth, async (req, res) => {
  const data = { ...req.body, userId: req.user.userId };
  const txn = new Transaction(data);
  await txn.save();
  res.json(txn);
});

// Read all / filter
router.get('/', auth, async (req, res) => {
  const query = { userId: req.user.userId, ...req.query };
  const txns = await Transaction.find(query).sort({ date: -1 });
  res.json(txns);
});

// Update
router.put('/:id', auth, async (req, res) => {
  const txn = await Transaction.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    { ...req.body, updatedAt: new Date() },
    { new: true }
  );
  res.json(txn);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id, userId: req.user.userId });
  res.json({ message: 'Deleted' });
});

module.exports = router;
