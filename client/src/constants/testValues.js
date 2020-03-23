export const toDoList = [
    {
        state: 'PENDING',
        _id: '5e719ecc2c0ce12bb473bc57',
        title: 'Eat',
        description: 'To put or take food into the mouth, chew it (= crush it with the teeth), and swallow it.',
        file: 'uploads/food.png',
        id: 1
    },
    {
        state: 'PENDING',
        _id: '5e7285d3679eb2225c1b0eae',
        title: 'Sleep',
        description: 'To go into or be in the condition of rest that comes when the body suspends certain functions and is in a state of unconsciousness.',
        file: 'uploads/sleeping-instructions.pdf',
        id: 2
    },
    {
        state: 'IN PROGRESS',
        _id: '5e72889b679eb2225c1b0eaf',
        title: 'Work',
        description: 'An activity, such as a job, that a person uses physical or mental effort to do, usually for money.',
        file: 'uploads/work.docx',
        id: 3
    },
    {
        state: 'DONE',
        _id: '5e72994392daab47c0aad968',
        title: 'Learn',
        description: 'to get knowledge or skill in a new subject or activity.',
        file: 'uploads/react-tutorial.pdf',
        id: 4
    }
];

export const storeState = {
    todos: {
        todos: toDoList,
        error: ''
    },
    form: {}
}