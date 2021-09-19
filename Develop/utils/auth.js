//Creating function to handle what to do if user is logged in or not
//If user is not logged in, will redirect to the login page
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;