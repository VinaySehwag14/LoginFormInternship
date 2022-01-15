const { validationResult } = require("express-validator");

//*validation checker
exports.userValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array()[0].msg;

    return res.status(400).json({ success: false, error });
  }

  next();
};
