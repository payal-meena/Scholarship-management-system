import jwt from 'jsonwebtoken';
const protect = (req,res,next) => {
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();

        } catch (error) {
            console.error('Token verification failed:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed or is invalid.'});
        }
    }

    if( !token) {
        return res.status(401).json({ message: 'Not authorized, no tken provided.'});
    }
};

export { protect };