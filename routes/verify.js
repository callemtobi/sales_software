import session from "express-session";

export const verifyUser = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login');
    }
    next();
};
