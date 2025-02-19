const jwt = require("jsonwebtoken");

//Auth midddle ware
class   Authorization {

    //the name of the cookies (Like getter in java )
    static get cookieName() {
        return "userAuth";
    }

    static checkLogin(req, res, next) {
        const jwtCookie = req.cookies[Authorization.cookieName];
 //first we check if the user is online ,  if the user is online it will generate a coockies authCookie here  , if coockie (!jwtCookie) not exist we reset the cookie
        if (!jwtCookie) {
            res.clearCookie(Authorization.cookieName);
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }
//if the cookies exist we decode the codes and attach the user id in person_id
        try {
            const JWTPayload = jwt.verify(jwtCookie, process.env.JWT_SECRET);
            req.person_id = JWTPayload.person_id;  
            next();
        } catch (error) {
            //if its invalid coocies we clear the coockies
            res.clearCookie(Authorization.cookieName);
            return res.status(403).json({ message: "Invalid or expired token" });
        }
    }


//using jwt.sign  we create a token and it contain the id

 
    static sendCookie(user, res) {
        const jwtToken = jwt.sign(
            { person_id: user.person_id, username: user.username },  
            process.env.JWT_SECRET,
            { expiresIn: "30 minutes" }
        );
//the tooken will stores in cookies , coockies workes when the browser is open and
        res.cookie(Authorization.cookieName, jwtToken, {
            httpOnly: true,
            expires: 0
        });
    }
}

module.exports = Authorization;

