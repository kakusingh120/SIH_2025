const { District } = require("../models/index");

/**
 * Admin: Get all districts
 */
const getAll = async (req, res) => {
    try {
        const districts = await District.findAll();
        return res.status(200).json({
            success: true,
            data: districts,
        });
    } catch (error) {
        console.error("Error fetching districts:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching districts",
        });
    }
};

module.exports = {
    getAll,
};
