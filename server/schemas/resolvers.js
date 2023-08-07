const { User, Workout } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { dateScalar } = require('./scalar');

let fetch;
(async () => {
  const fetchModule = await import('node-fetch');
  fetch = fetchModule.default;
})();

const exerciseOptions = {
  method: 'GET',
  headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await User.findById(context.user._id).populate('workouts');
    },
    getFromExerciseDb: async (parent, context) => {
      try {

        const url = `https://exercisedb.p.rapidapi.com/exercises/`
        const options = exerciseOptions;

        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    
      } catch (err) {
        console.log(err);
      };
    },
  },
  Mutation: {
    addUser: async (parent, argObj) => {
      try {
        const user = await User.create(argObj);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
        throw new UserInputError('Incomplete Fields')
      }
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveWorkout: async (_, { userId, bodyPart, equipment, gifUrl, name, target }, context) => {
      // Check if the user is authenticated, similar to other mutations
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      try {
        // Create a new workout object
        const newWorkout = new Workout({
          bodyPart,
          equipment,
          gifUrl,
          name,
          target,
          user: context.user._id,
        });

        // Save the workout to the database
        const savedWorkout = await newWorkout.save();

        const user = await User.findById(userId);

        if (!user || user._id.toString() !== context.user._id.toString()) {
          throw new AuthenticationError('You are not authorized.');
        }

        user.workouts.push(savedWorkout._id);
        await user.save();

        // Return the saved workout
        return savedWorkout;
      } catch (err) {
        console.log(err);
        throw new UserInputError('Failed to save workout.');
      }
    },
    deleteWorkout: async (_, { workoutId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Logged In');
      }

      try {
        const workout = await Workout.findById(workoutId);

        if (!workout || workout.user.toString() !== context.user._id.toString()) {
          throw new AuthenticationError('You are not authorized');
        }

        const user = await User.findById(context.user._id);
        user.workouts.pull(workoutId);
        await user.save();

        await Workout.findByIdAndDelete(workoutId);

        return workout;

      } catch (err) {
        console.log(err);
        throw new UserInputError('Failed to delete workout.')
      }
    }
  },
};

module.exports = resolvers;
