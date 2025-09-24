const UserService = require("../services/user.service");
const userService = new UserService();
const { verifyToken } = userService;


// Middleware to validate user authentication requests
const validateUserAuth = async (req, res, next) => {
    try {
        const { email, password, role, districtId } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "Invalid request",
                err: "Email or password is missing in the request"
            });
        }

        // If role is patta_holder, districtId is mandatory
        if (role === "patta_holder" && !districtId) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "Invalid request",
                err: "DistrictId is required for patta_holder"
            });
        }

        next();
    } catch (error) {
        console.log("Something went wrong in validateUserAuth middleware", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Server error in validation",
            err: error
        });
    }
};

// Middleware to validate admin-related requests
const validateIsAdminRequest = async (req, res, next) => {
    try {
        // const { id } = req.body;

        const id = req.params?.id || req.body?.id; // optional chaining


        if (!id) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "Invalid request",
                err: "User ID is missing in the request"
            });
        }

        next();
    } catch (error) {
        console.log("Something went wrong in validateIsAdminRequest middleware", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Server error in validation",
            err: error
        });
    }
};


const roleCheck = (roles) => {
    return (req, res, next) => {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        try {
            const decoded = verifyToken(token);
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Forbidden: Access denied" });
            }
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
};


module.exports = {
    validateUserAuth,
    validateIsAdminRequest,
    roleCheck
};
