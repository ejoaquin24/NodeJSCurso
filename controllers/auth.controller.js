import { User } from '../models/User.js'

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

		if(!user) return res.status(403).json({ error: "Usuario y contraseña incorrectos." })

		const passwordResponse = user.comparePassword(password)

		if(!passwordResponse) return res.status(403).json({ error: "Usuario y contraseña incorrectos."})

		res.json({ ok: "Login" });
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: "Error en el servidor." })
	}
}