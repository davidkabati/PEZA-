import 'dotenv/config';

export default {
  extra: {
    API_KEY: process.env.API_KEY === 'true',
  },
};
