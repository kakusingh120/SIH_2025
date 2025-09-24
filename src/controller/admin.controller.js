const { User } = require("../models/user");

/**
 * Admin: Delete user
 */
const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await User.destroy({ where: { id } });

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting user",
        });
    }
};

module.exports = {
    deleteUser,
};

