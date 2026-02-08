import { useState, useEffect } from 'react'
import taskService from '../../services/task.service'
import flowService from '../../services/flow.service'

const CreateTaskModal = ({ onClose, onSuccess }) => {
    const [flows, setFlows] = useState([])
    const [loadingFlows, setLoadingFlows] = useState(true)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        workflowId: '',
        pointsReward: 50,
        energyCost: 10
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchFlows = async () => {
            try {
                const data = await flowService.getAll()
                const flowList = Array.isArray(data) ? data : (data.data || [])
                setFlows(flowList)
                if (flowList.length > 0) {
                    setFormData(prev => ({ ...prev, workflowId: flowList[0]._id }))
                }
            } catch (err) {
                console.error("Failed to load flows", err)
                setError("Could not load flows. Please create a flow first.")
            } finally {
                setLoadingFlows(false)
            }
        }
        fetchFlows()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.workflowId) {
            setError("Please select a flow")
            return
        }

        setLoading(true)
        setError(null)

        try {
            // Generate a temporary nodeId since visual editor isn't ready
            const payload = {
                ...formData,
                nodeId: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                status: 'pending'
            }

            await taskService.create(payload)
            onSuccess()
            onClose()
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to create task')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Create New Task</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loadingFlows ? (
                    <p>Loading your flows...</p>
                ) : flows.length === 0 ? (
                    <div className="empty-state-modal">
                        <p>You need a Flow to create a Task.</p>
                        <button className="btn-card" onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Parent Flow</label>
                            <select
                                name="workflowId"
                                value={formData.workflowId}
                                onChange={handleChange}
                                required
                                className="select-input"
                            >
                                <option value="" disabled>Select a Flow</option>
                                {flows.map(flow => (
                                    <option key={flow._id} value={flow._id}>
                                        {flow.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Task Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Read Chapter 1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Points Reward</label>
                            <input
                                type="number"
                                name="pointsReward"
                                value={formData.pointsReward}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label>Energy Cost</label>
                            <input
                                type="number"
                                name="energyCost"
                                value={formData.energyCost}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="btn-card" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Create Task' : 'Create Task'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default CreateTaskModal
