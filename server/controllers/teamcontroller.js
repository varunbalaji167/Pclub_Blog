// controllers/teamcontroller.js
const Team = require("../models/teamModel");

// Create a new team member
exports.createTeamMember = async (req, res) => {
    try {
        const { name, role, email, instagram, linkedin, github, image } = req.body;

        const newMember = new Team({
            name,
            role,
            email,
            instagram,
            linkedin,
            github,
            image,
        });

        await newMember.save();
        res.status(201).json({ message: 'Team member created successfully', teamMember: newMember });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all team members
exports.getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await Team.find();
        res.status(200).json(teamMembers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single team member by ID
exports.getTeamMemberById = async (req, res) => {
    try {
        const teamMember = await Team.findById(req.params.id);
        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.status(200).json(teamMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a team member by ID
exports.updateTeamMember = async (req, res) => {
    try {
        const updatedData = req.body;
        const teamMember = await Team.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.status(200).json({ message: 'Team member updated successfully', teamMember });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a team member by ID
exports.deleteTeamMember = async (req, res) => {
    try {
        const teamMember = await Team.findByIdAndDelete(req.params.id);
        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};