const { UserService } = require("../services/index");

const userService = new UserService();

// Create a user (Patta Holder self-registration or admin/officer via backend)
const create = async (req, res) => {
    try {
        const { name, email, password, role, districtId } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "Name, email, and password are required",
                err: {}
            });
        }

        // For patta holders, districtId is required
        if (role === "patta_holder" && !districtId) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "districtId is required for patta_holder",
                err: {}
            });
        }

        const userData = {
            name,
            email: email.toLowerCase(),
            password,
            role: role || "patta_holder",
            districtId: districtId || null
        };

        const user = await userService.create(userData);

        return res.status(201).json({
            data: user,
            success: true,
            message: "Successfully created a new user",
            err: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            data: {},
            success: false,
            message: error.message || "Something went wrong while creating user",
            err: error.explanation || error.errors || {}
        });
    }
};


const signupOfficer = async (req, res) => {
    try {
        const { name, email, password, districtId, code } = req.body;

        if (!name || !email || !password || !code) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "Name, email, password and officer code are required",
                err: {}
            });
        }

        const userData = {
            name,
            email,
            password,
            role: "officer",
            districtId,
            code
        };

        const user = await userService.createOfficer(userData);

        return res.status(201).json({
            data: user,
            success: true,
            message: "Successfully registered officer",
            err: {}
        });

    } catch (error) {
        console.log("Error in signupOfficer:", error);
        return res.status(error.statusCode || 500).json({
            data: {},
            success: false,
            message: error.message || "Something went wrong while creating officer",
            err: error.explanation || {}
        });
    }
};


// Delete a user by ID
const destroy = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await userService.destroy(id);
        return res.status(200).json({
            data: {},
            success: true,
            message: "Successfully deleted a user",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to delete user",
            err: error
        });
    }
};

// User SignIn
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService.signIn(email, password);
        return res.status(200).json({
            data: { token },
            success: true,
            message: "Successfully signed in",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 401).json({
            data: {},
            success: false,
            message: error.message || "Sign-in failed",
            err: error.explanation || {}
        });
    }
};


// Check if user is authenticated
const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                data: {},
                success: false,
                message: "No token provided",
                err: {}
            });
        }

        const userId = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: { userId },
            success: true,
            message: "User authenticated and token is valid",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            data: {},
            success: false,
            message: error.message || "Authentication failed",
            err: error
        });
    }
};

// Check if user is admin
const isAdmin = async (req, res) => {
    try {
        // Get ID from URL params or body
        const id = parseInt(req.params.id || req.body.id, 10);

        if (!id || isNaN(id)) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "Invalid or missing user ID",
                err: {}
            });
        }

        // Call service to check role
        const response = await userService.isAdmin(id);

        return res.status(200).json({
            data: { isAdmin: response },
            success: true,
            message: "Successfully fetched whether user is admin or not",
            err: {}
        });
    } catch (error) {
        console.log("Error in isAdmin controller:", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: error
        });
    }
};

const getPattaHoldersByDistrict = async (req, res) => {
    try {
        const districtId = req.query.districtId; // or from token
        const holders = await userService.getPattaHoldersByDistrict(districtId);
        return res.status(200).json({
            data: holders,
            success: true,
            message: "Fetched patta holders successfully",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Failed to fetch patta holders",
            err: error
        });
    }
};

module.exports = {
    create,
    destroy,
    signIn,
    isAuthenticated,
    isAdmin,
    signupOfficer,
    getPattaHoldersByDistrict // add here
};

