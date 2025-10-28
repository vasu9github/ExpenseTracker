import Expense from '../model/expense.js';

export const getExpenses = async (req, res) => {
	try {
		const expenses = await Expense.find().sort({ date: -1 });
		res.status(200).json({ success: true, data: expenses });
	} catch (err) {
		res.status(500).json({ success: false, error: 'Server Error' });
	}
};

export const addExpense = async (req, res) => {
	try {
		const { title, amount, category, date } = req.body;
		if (!title || !amount || !category || !date) {
			return res.status(400).json({ success: false, error: 'Please provide all fields' });
		}

		const expense = await Expense.create(req.body);
		res.status(201).json({ success: true, data: expense });
	} catch (err) {
		if (err.name === 'ValidationError') {
			const messages = Object.values(err.errors).map(val => val.message);
			return res.status(400).json({ success: false, error: messages });
		}
		res.status(500).json({ success: false, error: 'Server Error' });
	}
};

export const deleteExpense = async (req, res) => {
	try {
		const expense = await Expense.findById(req.params.id);
		if (!expense) {
			return res.status(404).json({ success: false, error: 'No expense found' });
		}
		await expense.deleteOne();
		res.status(200).json({ success: true, data: {} });
	} catch (err) {
		res.status(500).json({ success: false, error: 'Server Error' });
	}
};

export const updateExpense = async (req, res) => {
	try {
		const expense = await Expense.findById(req.params.id);
		if (!expense) {
			return res.status(404).json({ success: false, error: 'No expense found' });
		}

		const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({ success: true, data: updatedExpense });
	} catch (err) {
		res.status(500).json({ success: false, error: 'Server Error' });
	}
};