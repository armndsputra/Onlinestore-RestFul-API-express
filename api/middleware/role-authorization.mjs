import jwt from 'jsonwebtoken';

export default (req, res ,next) => {

    try {
        
        const token = req.headers.authorization

        if (token === undefined) {
            return res.status(401).json({ message: 'Token is not available !' });
        }
        var decoded = jwt.verify(token, process.env.JWT_KEY)
        if (decoded) {
            req.user = decoded
            next()
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message : 'Authorization failed !',
        })
    }
}