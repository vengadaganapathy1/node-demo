var middleware = {
  log: function (req, res, next) {
    console.log("Logging");
    next();
  },
  authenticate: function (req, res, next) {
    console.log("Authenticating");
    next();
  },
};

module.exports = middleware;
