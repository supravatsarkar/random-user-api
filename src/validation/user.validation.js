const Joi = require("joi");
const saveUser = (req, res, next) => {
  const schema = Joi.object({
    // id: Joi.string().required(), //id not require. we generate from BE
    gender: Joi.string().required(),
    name: Joi.string().required(),
    contact: Joi.string().required(),
    address: Joi.string().required(),
    photoUrl: Joi.string().required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    console.log("validation error=>", validation.error);
    return next(validation.error);
  }
  next();
};

const updateUser = (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    gender: Joi.string().optional(),
    name: Joi.string().optional(),
    contact: Joi.string().optional(),
    address: Joi.string().optional(),
    photoUrl: Joi.string().optional(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    console.log("validation error=>", validation.error);
    return next(validation.error);
  }
  next();
};
const deleteUser = (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    console.log("validation error=>", validation.error);
    return next(validation.error);
  }
  next();
};

const bulkUpdate = (req, res, next) => {
  const schema = Joi.array().items({
    _id: Joi.string().required(),
    gender: Joi.string().optional(),
    name: Joi.string().optional(),
    contact: Joi.string().optional(),
    address: Joi.string().optional(),
    photoUrl: Joi.string().optional(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    console.log("validation error=>", validation.error);
    return next(validation.error);
  }
  next();
};

module.exports = {
  saveUser,
  updateUser,
  bulkUpdate,
  deleteUser,
};
