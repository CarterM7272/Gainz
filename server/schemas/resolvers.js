const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { dateScalar, jsonScalar } = require('./scalar');

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
  JSON: jsonScalar,
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await User.findById(context.user._id)
    },
    getFromExerciseDb: async (parent, { queryString }, context) => {
      try {

        const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${queryString ? queryString : ''}`
        const options = exerciseOptions;

        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    
      } catch (err) {
        console.log(err);
      };
    },
    // getWorkouts: async ()
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
  }
};

module.exports = resolvers;
