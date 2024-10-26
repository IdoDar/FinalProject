const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401) // Unauthorized
        const rolesArray = [...allowedRoles];
        const results = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!results) return res.sendStatus(401); //Unauthorized
        next();
    }
}

module.exports = verifyRoles;