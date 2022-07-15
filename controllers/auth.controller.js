import { User } from '../models/User.js'
import { generateToken } from '../utils/tokenManager.js';

export const register = async (req, res) => {
	const { email, password } = req.body

	try {
		// Alternativa dos para valdiar si esta creado el usuario
		let user = await User.findOne({ email });

		if(user) throw { code: 11000 };

		user = new User({ email, password });
		await user.save();

		return res.status(201).json({ ok: true });
	} catch (error) {
		console.log(error)
		if(error.code === 11000) return res.status(400).json({ error: 'Ya fue creado el usuario' })
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email })
		const passwordResponse = user.comparePassword(password)

		if(!user) return res.status(403).json({ error: "Usuario y contraseña incorrectos." })
		
		if(!passwordResponse) return res.status(403).json({ error: "Usuario y contraseña incorrectos."})

		// Generar el JWT
		const { token, expiresIn } = generateToken(user.id);

		return res.json({ token, expiresIn });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Error en el servidor." })
	}
}

export const infoUser = async ( req, res ) => {
	try {
		const user = await User.findById(req.uid)

		return res.json({ email: user.email })
	} catch (error) {
		return res.status(500).json('Error de server')
	}
}