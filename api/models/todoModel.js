const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

let ValidStates = {
    values: ['PENDING', 'IN PROGRESS', 'DONE'],
    message: '{VALUE} is not a valid value.'
}

let Schema = mongoose.Schema;

let todoSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required.']
        },
        description: {
            type: String,
            required: [true, 'Description is required.']
        },
        state: {
            type: String,
            default: 'PENDING',
            enum: ValidStates
        },
        file: {
            type: String,
            required: false
        }
    }
);

todoSchema.plugin(AutoIncrement, { id: 'todo_seq', inc_field: 'id' });

module.exports = mongoose.model('todo', todoSchema);