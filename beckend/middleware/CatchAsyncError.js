// Recommended that if we use Async Function then use try and catch Block
module.exports = (theFunc) => (req, res, next) => {
  // Promise is a Predefined Class
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
