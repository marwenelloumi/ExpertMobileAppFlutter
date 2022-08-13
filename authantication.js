async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCSESS_TOKEN_KEY, async (err, utilisateur) => {
        if (err) return res.sendStatus(403)
        req.utilisateur = utilisateur
        try {
            utilisateur = await Utilisateur.findOne({ email: req.utilisateur.email })

        }
        catch (err) {
            return res.status(500).json({ message: err.message })
        }
        res.utilisateur = utilisateur
        next()
    })
}