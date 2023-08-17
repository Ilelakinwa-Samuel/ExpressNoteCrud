import Joi, { boolean } from "joi";

export const signupSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  email: Joi.string().trim().lowercase().required(),
  gender: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().lowercase().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{5,20}$/)
    .required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const create_NoteSchema = Joi.object().keys({
  title: Joi.string().lowercase().required(),
  description: Joi.string().lowercase().required(),
  duedate: Joi.number().required(),
  status: Joi.string().required(),
});

export const loginUserSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{5,20}$/)
    .required(),
});

export const updateUserSchema = Joi.object().keys({
  fullname: Joi.string().lowercase(),
  email: Joi.string().trim().lowercase(),
  gender: Joi.string().lowercase(),
  phone: Joi.string().trim(),
  address: Joi.string().lowercase(),
});

export const updatenoteschema = Joi.object().keys({
  Title: Joi.string().lowercase(),
  description: Joi.string().trim().lowercase(),
  DueDate: Joi.string().trim().lowercase(),
  status: boolean,
});
