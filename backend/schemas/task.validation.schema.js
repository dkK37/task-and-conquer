const Joi = require('joi');

const taskValidationSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have a minimum length of 3 characters',
      'string.max': 'Title should have a maximum length of 100 characters',
      'any.required': 'Title is required',
    }),

  description: Joi.string()
    .max(500)
    .optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description should have a maximum length of 500 characters',
    }),

  dueDate: Joi.date()
    .optional()
    .messages({
      'date.base': 'Due date must be a valid date',
    }),

  status: Joi.string()
    .valid('new', 'in progress', 'completed')
    .optional()
    .messages({
      'string.base': 'Status must be a string',
      'any.only': 'Status must be one of the following values: "new", "in progress", "completed"',
    }),
});

const validateTask = (taskData) => {
    return taskValidationSchema.validate(taskData);
};

module.exports = {
    taskValidationSchema,
    validateTask
};
