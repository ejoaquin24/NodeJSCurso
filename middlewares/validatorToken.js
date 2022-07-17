import jwt from 'jsonwebtoken'

export const validatorToken = ( req, res, next ) => {
	try {
		let token = req.cookies.token
		
		if(!token) throw new Error("No Bearer")
		
		//token = token.split(' ')[1];
		const payload = jwt.verify(token, process.env.JWT_SECRET)

		req.uid = payload.uid
		
		next()
	} catch (error) {
		console.log(error)

		const tokenVerificationErrors = {
			"invalid signature": "La firma del JWT no es válida",
			"jwt expired": "JWT expirado",
			"invalid token": "Token no válido",
			"No Bearer": "Utiliza formato Bearer",
			"jwt maltformed": "No tiene formato Bearer",
			"jwt must be provided": "No existe el token"
		}

		return res.status(401).send({ error: tokenVerificationErrors[error.message] })
	}
}

export const validatorTokenRespaldo = ( req, res, next ) => {
	try {
		let token = req.headers?.authorization
		
		if(!token) throw new Error("No Bearer")
		
		token = token.split(' ')[1];
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		console.log(payload)

		req.uid = payload.uid
		
		next()
	} catch (error) {
		console.log(error)

		const tokenVerificationErrors = {
			"invalid signature": "La firma del JWT no es válida",
			"jwt expired": "JWT expirado",
			"invalid token": "Token no válido",
			"No Bearer": "Utiliza formato Bearer",
			"jwt maltformed": "No tiene formato Bearer",
			"jwt must be provided": "No existe el token"
		}

		return res.status(401).send({ error: tokenVerificationErrors[error.message] })
	}
}