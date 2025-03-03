const jwt = require("jsonwebtoken");

//Auth midddle ware
class   Authorization {

    /**
     * Get the name of the cookies.
     * @returns userAuth
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
        const jwtCookie = req.cookies[Authorization.cookieName];
        
        if (!jwtCookie) {
            res.clearCookie(Authorization.cookieName);
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        try {
            const JWTPayload = jwt.verify(jwtCookie, process.env.JWT_SECRET);
            req.person_id = JWTPayload.person_id;
            req.role_id = JWTPayload.role_id;  
            next();
        } catch (error) {
            
            res.clearCookie(Authorization.cookieName);
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
        
        /**
         * --- Test ---
         * console.log("checkRecruiter");
         * console.log("req.role_id: ", req.role_id);
         */
        
        if (req.role_id !== 1) {
            return res.status(403).json({ message: "Forbidden - Recruiters only. User has no access"});
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
        /**
         * --- Test ---
         * console.log("sendCookie user: ", user);
        */
        const jwtToken = jwt.sign(
            { person_id: user.person_id, username: user.username, role_id: user.role_id },  
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
        
        res.cookie(Authorization.cookieName, jwtToken, {
            httpOnly: true, 
            secure: true,  
            sameSite: "None", 
            partitioned: true,
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000)  //two ours

        });
    }

    /**
     * Removie the cookie
     * @param {*} res 
     */
    static removeCookie(res) {
        res.clearCookie(Authorization.cookieName, {
            httpOnly: true,
        });
    }
}

module.exports = Authorization;

