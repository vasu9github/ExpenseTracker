import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title'],
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive amount'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    date: {
        type: Date,
        required: [true, 'Please add a date'],
    },
 
}, { timestamps: true });

const expenseModel = mongoose.model('Expense' , expenseSchema)
export default expenseModel;