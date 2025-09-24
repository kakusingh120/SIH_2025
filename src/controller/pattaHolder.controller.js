// controllers/pattaHolderController.js
const { PattaHolder } = require('../models/index');

// Get all patta holders
const getAllPattaHolders = async (req, res) => {
    try {
        const holders = await PattaHolder.findAll();
        return res.status(200).json({
            data: holders,
            success: true,
            message: "Fetched all patta holders",
            err: {}
        });
    } catch (error) {
        console.log("Error in getAllPattaHolders:", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Failed to fetch patta holders",
            err: error
        });
    }
};

// Get a single patta holder by ID
const getPattaHolderById = async (req, res) => {
    try {
        const holder = await PattaHolder.findByPk(req.params.id);
        if (!holder) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Patta holder not found",
                err: {}
            });
        }
        return res.status(200).json({
            data: holder,
            success: true,
            message: "Fetched patta holder successfully",
            err: {}
        });
    } catch (error) {
        console.log("Error in getPattaHolderById:", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Failed to fetch patta holder",
            err: error
        });
    }
};

// Create a new patta holder
const createPattaHolder = async (req, res) => {
    try {
        const { name, email, districtId, claimedArea, officerId } = req.body;

        if (!name || !email || !districtId || !claimedArea || !officerId) {
            return res.status(400).json({
                data: {},
                success: false,
                message: "Missing required fields",
                err: {}
            });
        }

        const newHolder = await PattaHolder.create({ name, email, districtId, claimedArea, officerId });

        return res.status(201).json({
            data: newHolder,
            success: true,
            message: "Successfully created a new patta holder",
            err: {}
        });

    } catch (error) {
        console.log("Error in createPattaHolder:", error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                data: {},
                success: false,
                message: "Email already exists",
                err: error
            });
        }

        return res.status(500).json({
            data: {},
            success: false,
            message: "Failed to create patta holder",
            err: error
        });
    }
};


// Update a patta holder
const updatePattaHolder = async (req, res) => {
    try {
        const holder = await PattaHolder.findByPk(req.params.id);
        if (!holder) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Patta holder not found",
                err: {}
            });
        }
        await holder.update(req.body);
        return res.status(200).json({
            data: holder,
            success: true,
            message: "Successfully updated patta holder",
            err: {}
        });
    } catch (error) {
        console.log("Error in updatePattaHolder:", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Failed to update patta holder",
            err: error
        });
    }
};

// Delete a patta holder
const deletePattaHolder = async (req, res) => {
    try {
        const holder = await PattaHolder.findByPk(req.params.id);
        if (!holder) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Patta holder not found",
                err: {}
            });
        }
        await holder.destroy();
        return res.status(200).json({
            data: {},
            success: true,
            message: "Successfully deleted patta holder",
            err: {}
        });
    } catch (error) {
        console.log("Error in deletePattaHolder:", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Failed to delete patta holder",
            err: error
        });
    }
};

module.exports = {
    getAllPattaHolders,
    getPattaHolderById,
    createPattaHolder,
    updatePattaHolder,
    deletePattaHolder
};
