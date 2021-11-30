import jwt from "jsonwebtoken";
function authHandle(req, res, next) {
    const cookie = req.cookies["jwt"];
    console.log("auth", cookie);
    jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if (err) {
            return res.sendStatus(403);
        }
        if (result) {
            console.log(result.user);
            req.user = result.user;
        }
        next();
    });
}
export const authHandler = authHandle;
//# sourceMappingURL=auth.middleware.js.map