const ValidationError = require("../utils/validation.error");
const { User, District, State } = require("../models/index");
const ClientError = require("../utils/client.error");
const { StatusCodes } = require("http-status-codes");

class UserRepository {

    // Create a new user (Patta Holder or Officer/Admin assigned manually)
    async create(data) {
        try {
            // Optional: verify district exists
            if (data.districtId) {
                const district = await District.findByPk(data.districtId);
                if (!district) {
                    throw new ClientError(
                        "DistrictNotFound",
                        "Invalid districtId",
                        "The district you provided does not exist",
                        StatusCodes.BAD_REQUEST
                    );
                }
            }

            const user = await User.create(data);
            return user;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            console.log("Something went wrong in repository layer (create)");
            throw error;
        }
    }

    
    // Delete a user
    async destroy(userId) {
        try {
            const response = await User.destroy({
                where: { id: userId }
            });
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer (destroy)");
            throw error;
        }
    }

    // Get user by ID
    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ["id", "name", "email", "role", "districtId"]
            });
            if (!user) {
                throw new ClientError(
                    "UserNotFound",
                    "User not found",
                    `No user exists with id ${userId}`,
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer (getById)");
            throw error;
        }
    }

    // Get user by email
    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: { email: userEmail.toLowerCase() },
                include: [
                    {
                        model: District,
                        as: "district",
                        include: [{ model: State, as: "state" }]
                    }
                ]
            });

            if (!user) {
                throw new ClientError(
                    "AttributeNotFound",
                    "Invalid email sent in the request",
                    "Please check the email, as there is no record of this email",
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer (getByEmail)");
            throw error;
        }
    }

    // Check if user is admin
    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) return false;
            return user.role === "admin";
        } catch (error) {
            console.log("Something went wrong in repository layer (isAdmin)");
            throw error;
        }
    }

    // Get all patta holders in a district (for officers)
    async getPattaHoldersByDistrict(districtId) {
        try {
            const users = await User.findAll({
                where: { districtId, role: "patta_holder" },
                attributes: ["id", "name", "email", "districtId"]
            });
            return users;
        } catch (error) {
            console.log("Something went wrong in repository layer (getPattaHoldersByDistrict)");
            throw error;
        }
    }

}

module.exports = UserRepository;
