const logout_controller = {
    getLogout: (req, res) => {
        req.session.destroy((err) => {
            if(err) throw err;
			console.log("Session Destroyed!");
            res.redirect('/login');
        });
    }
};

module.exports = logout_controller;