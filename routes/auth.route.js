import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator'
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
const router = express.Router();

router.post(
	"/register", 
	[
		body("email", "Formato de email incorrecto")
			.trim()
			.isEmail()
			.normalizeEmail(),
		body("password","Formato de password incorrecto")
			.trim()
			.isLength({ min: 8 })
			.isAlphanumeric()
	],
	validationResultExpress,
	register
);
router.post(
	"/login", 
	[
		body("email", "Formato de email incorrecto")
			.trim()
			.isEmail()
			.normalizeEmail(),
		body("password","Formato de password incorrecto")
			.trim()
			.isLength({ min: 8 })
			.isAlphanumeric()
	],
	validationResultExpress,
	login
);

export default router;