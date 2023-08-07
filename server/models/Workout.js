const { Schema, model } = require('mongoose');

const workoutSchema = new Schema(
    {
        bodyPart: {
            type: String 
        },
        equipment: {
            type: String
        },
        gifUrl: {
            type: String 
        },
        name: {
            type: String 
        },
        target: {
            type: String 
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Workout = model('Workout', workoutSchema);

module.exports = Workout;