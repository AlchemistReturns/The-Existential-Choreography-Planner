import { FlowService } from '../services/flowService.js';

const flowService = new FlowService();

export class FlowController {
    getAll = async (req, res) => {
        try {
            const flows = await flowService.getUserFlows(req.user._id);
            res.json(flows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching flows' });
        }
    }

    create = async (req, res) => {
        try {
            const flow = await flowService.createFlow(req.user._id, req.body);
            res.status(201).json(flow);
        } catch (error) {
            res.status(500).json({ message: 'Error creating flow' });
        }
    }

    getById = async (req, res) => {
        try {
            const flow = await flowService.getFlowById(req.params.id);
            if (!flow) return res.status(404).json({ message: 'Flow not found' });

            // Check ownership or public status
            if (flow.userId.toString() !== req.user._id.toString() && !flow.isPublic) {
                return res.status(403).json({ message: 'Access denied' });
            }

            res.json(flow);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching flow details' });
        }
    }

    update = async (req, res) => {
        try {
            const flow = await flowService.updateFlow(req.user._id, req.params.id, req.body);
            res.json(flow);
        } catch (error) {
            if (error.message === 'Unauthorized') {
                return res.status(403).json({ message: 'Unauthorized update' });
            }
            if (error.message === 'Flow not found') {
                return res.status(404).json({ message: 'Flow not found' });
            }
            res.status(500).json({ message: 'Error updating flow' });
        }
    }

    delete = async (req, res) => {
        try {
            const result = await flowService.deleteFlow(req.user._id, req.params.id);
            res.json({ message: 'Flow deleted successfully' });
        } catch (error) {
            if (error.message === 'Unauthorized') {
                return res.status(403).json({ message: 'Unauthorized delete' });
            }
            if (error.message === 'Flow not found') {
                return res.status(404).json({ message: 'Flow not found' });
            }
            res.status(500).json({ message: 'Error deleting flow' });
        }
    }
}
