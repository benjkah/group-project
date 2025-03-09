const jwt = require("jsonwebtoken");

class Authorization {
    /**
     * Get the name of the authentication cookie.
     * @returns {string} Cookie name
     */
    static get cookieName() {
        return "userAuth";
    }

    /**
     * Check if the user is loggin. 
     * first we check if the user is online ,  if the user is online it will generate a coockies authCookie here  , if coockie (!jwtCookie) not exist we reset the cookie.
     * if the cookies exist we decode the codes and attach the user id in person_id
     * if its invalid coocies we clear the coockies
     * 
     * @param {*} req cookies data 
     * @param {*} res if Error status
     * @param {*} next
     */
    static checkLogin(req, res, next) {
        const token = req.cookies[Authorization.cookieName];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.person_id = payload.person_id;
            req.role_id = payload.role_id;
            next();
        } catch (error) {
            console.error("Auth Error:", error.message); 
            return res.status(403).json({ message: "Invalid or expired token" });
        }
    }

    /**
     * Check if user has role_id = 1 ("Admin");
     * @param {*} req the user 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    static checkRecruiter(req, res, next) {
        if (req.role_id !== 1) {
            return res.status(403).json({ message: "Forbidden - Recruiters only" });
        }
        next();
    }

   /** create a token and it contain the id, using jwt.sign  
     *  Tooken will stores in cookies , coockies workes when the browser is open and save max 30 min. 
     * 
     * @param {*} user 
     * @param {*} res 
     */
    static sendCookie(user, res) {
        const token = jwt.sign(
            { person_id: user.person_id, username: user.username, role_id: user.role_id },  
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.cookie(Authorization.cookieName, token, {
            httpOnly: true,
            secure: true,  
            sameSite: "None",
            path: "/",     
            expires: 0 ,
            partitioned: true 
        });
    }

     /**
     * Removie the cookie
     * @param {*} res 
     */
    static removeCookie(res) {
        res.clearCookie(Authorization.cookieName, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        });
    }

    /**
     * API route to check if the user is authenticated.
     * - If token is valid, returns  isAuthenticated: true, user 
     * - If invalid, returns  isAuthenticated: false 
     * 
     * @param {*} user 
     * @param {*} res 
     */
    static checkAuth(req, res) {
        const token = req.cookies[Authorization.cookieName];

        if (!token) {
            return res.json({ isAuthenticated: false });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.json({ isAuthenticated: true, user: decoded });
        } catch (error) {
            res.json({ isAuthenticated: false });
        }
    }
}

module.exports = Authorization;
