// routes/pattaHolderRoutes.js
const express = require('express');
const router = express.Router();
const pattaController = require('../../controller/pattaHolder.controller');
const { AuthRequestValidator } = require('../../middleware/index');

router.get('/', AuthRequestValidator.validateUserAuth, AuthRequestValidator.roleCheck(['admin', 'officer']), pattaController.getAllPattaHolders);
router.get('/:id', AuthRequestValidator.validateUserAuth, AuthRequestValidator.roleCheck(['admin', 'officer']), pattaController.getPattaHolderById);
router.post('/',   pattaController.createPattaHolder);
router.put('/:id', AuthRequestValidator.validateUserAuth, AuthRequestValidator.roleCheck(['admin', 'officer']), pattaController.updatePattaHolder);
router.delete('/:id', AuthRequestValidator.validateUserAuth, AuthRequestValidator.roleCheck(['admin', 'officer']), pattaController.deletePattaHolder);

module.exports = router;
