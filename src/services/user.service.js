const { UserRepository } = require("../repository/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/server.config");
const AppError = require("../utils/error.handler");
const serverConfig = require("../config/server.config");

const OFFICER_CODE = serverConfig.OFFICER_CODE || "OFFICER2025";


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    // Create a new user (Patta Holder self-registration or Admin/Officer creation)
    async create(data) {
        try {
            data.email = data.email.toLowerCase();

            if (data.role === "patta_holder" && !data.districtId) {
                throw new AppError(
                    "InvalidData",
                    "District is required for patta_holder",
                    "Please provide a valid districtId",
                    400
                );
            }

            // Encrypt password
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }

            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer (create)");
            throw error;
        }
    }


    // Delete a user
    async destroy(id) {
        try {
            const response = await this.userRepository.destroy(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer (destroy)");
            throw error;
        }
    }

    // Get user by ID
    async get(id) {
        try {
            const user = await this.userRepository.getById(id);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer (get)");
            throw error;
        }
    }

    // Get all users (optional, admin-only)
    async getAll() {
        try {
            const users = await this.userRepository.getAll();
            return users;
        } catch (error) {
            console.log("Something went wrong in service layer (getAll)");
            throw error;
        }
    }

    // Update user info
    async update(id, data) {
        try {
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }
            const user = await this.userRepository.update(id, data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer (update)");
            throw error;
        }
    }

    // Verify JWT and return user ID
    async isAuthenticated(token) {
        try {
            const decoded = this.verifyToken(token);
            const user = await this.userRepository.getById(decoded.id);
            if (!user) {
                throw new AppError(
                    "Unauthorized",
                    "No user found with token",
                    "Token is valid but user does not exist",
                    401
                );
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in auth process (isAuthenticated)");
            throw error;
        }
    }

    // Sign in a user and return JWT
    async signIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = await bcrypt.compare(plainPassword, user.password);

            if (!passwordMatch) {
                throw new AppError(
                    "AuthenticationFailed",
                    "Incorrect password",
                    "The password you entered is incorrect",
                    401
                );
            }

            // Create JWT with id, role, and districtId for access control
            const tokenPayload = {
                id: user.id,
                role: user.role,
                districtId: user.districtId
            };
            const token = this.createToken(tokenPayload);
            return token;
        } catch (error) {
            console.log("Something went wrong in signIn process");
            throw error;
        }
    }

    // Create JWT token
    createToken(payload) {
        try {
            return jwt.sign(payload, JWT_KEY, { expiresIn: "1h" });
        } catch (error) {
            console.log("Something went wrong in token creation", error);
            throw error;
        }
    }

    // Verify JWT token
    verifyToken(token) {
        try {
            return jwt.verify(token, JWT_KEY);
        } catch (error) {
            console.log("Something went wrong in token validation", error.message);
            throw new AppError(
                "Unauthorized",
                "Invalid or expired token",
                error.message,
                401
            );
        }
    }

    // Check if user is admin
    async isAdmin(userId) {
        try {
            return await this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in isAdmin process");
            throw error;
        }
    }

    // Get all patta holders in a district (for officers)
    async getPattaHoldersByDistrict(districtId) {
        try {
            const users = await this.userRepository.getPattaHoldersByDistrict(districtId);
            return users;
        } catch (error) {
            console.log("Something went wrong in getPattaHoldersByDistrict process");
            throw error;
        }
    }

    async createOfficer(data) {
        try {
            // 1️⃣ Verify officer code
            if (data.code !== OFFICER_CODE) {
                throw new AppError(
                    "Unauthorized",
                    "Invalid officer code",
                    "Please provide a valid officer code",
                    401
                );
            }

            // 2️⃣ Force the role to be 'officer' (ignores whatever was in req.body)
            data.role = "officer";

            // 3️⃣ Standardize email
            data.email = data.email.toLowerCase();

            // 4️⃣ Hash password before saving
            data.password = await bcrypt.hash(data.password, 10);

            // 5️⃣ Create user via repository (saves to DB)
            const user = await this.userRepository.create(data);
            return user;

        } catch (error) {
            console.log("Something went wrong in service layer (createOfficer)");
            throw error;
        }
    }





}

module.exports = UserService;
