const express = require("express");
const UserController = require("../../controller/user.controller");
const DistrictController = require("../../controller/district.controller");
const { AuthRequestValidator } = require("../../middleware/index");

const router = express.Router();

// ----------------- Auth Routes -----------------
router.post("/signup", AuthRequestValidator.validateUserAuth, UserController.create);
router.post("/signup/officer", UserController.signupOfficer);
router.post("/signin", AuthRequestValidator.validateUserAuth, UserController.signIn);
router.get("/isAuthenticated", UserController.isAuthenticated);
router.delete("/delete/:id", AuthRequestValidator.roleCheck(["admin"]), UserController.destroy);
router.get("/isAdmin/:id", AuthRequestValidator.roleCheck(["admin"]), UserController.isAdmin);

// ----------------- Admin Routes -----------------
router.get("/districts", AuthRequestValidator.roleCheck(["admin"]), DistrictController.getAll);

module.exports = router;














// const express = require("express");
// const UserController = require("../../controller/user.controller");
// const DistrictController = require("../../controller/district.controller");
// const { AuthRequestValidator } = require("../../middleware/index");

// const router = express.Router();

// // ----------------- Auth Routes -----------------
// router.post("/auth/signup", AuthRequestValidator.validateUserAuth, UserController.create);
// router.post("/auth/signup/officer", UserController.signupOfficer);
// router.post("/auth/signin", AuthRequestValidator.validateUserAuth, UserController.signIn);
// router.get("/auth/isAuthenticated", UserController.isAuthenticated);
// router.delete("/auth/delete/:id", AuthRequestValidator.roleCheck(["admin"]), UserController.destroy);
// router.get("/auth/isAdmin/:id", AuthRequestValidator.roleCheck(["admin"]), UserController.isAdmin);

// // ----------------- Admin Routes -----------------
// router.get("/districts", AuthRequestValidator.roleCheck(["admin"]), DistrictController.getAll);

// // ----------------- Officer Routes -----------------
// router.get("/pattaHolders", AuthRequestValidator.roleCheck(["officer"]), UserController.getPattaHoldersByDistrict);

// module.exports = router;
