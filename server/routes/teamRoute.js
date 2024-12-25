const express = require('express');
const router = express.Router();
const {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamcontroller");

// Create a new team member
router.post('/', createTeamMember);

// Get all team members
router.get('/', getAllTeamMembers);

// Get a team member by ID
router.get('/:id', getTeamMemberById);

// Update a team member by ID
router.put('/:id', updateTeamMember);

// Delete a team member by ID
router.delete('/:id', deleteTeamMember);

module.exports = router;