import express from 'express';
import Plan from '../models/plan.models.js';

const router = express.Router();

// GET /api/plans - returns all available plans
router.get('/', async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: 'Failed to load plans' });
    }
});

// POST /api/plans - returns a specific plan by ID
router.post('/', async (req, res) => {
    try {
        const planId = req.body.planId;
        if (!planId) {
            return res.status(400).json({ message: 'Plan ID is required' });
        }
        // now find the plan by ID
        const plan = await Plan.findById(planId);
        res.send(plan);
    } catch (err) {
        res.status(500).json({ message: 'Failed to load plans' });
    }
});

export default router;
