module.exports = {
  local: {
    region: process.env.AWS_REGION,
    endpoint: process.env.DB_ENDPOINT
  },
  remote: {
    // TBFL
  }
};
