const  express = require('express')
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks');

const router = express.Router()

router.get('/', getAllTasks)
router.post('/', createTask)
router.get('/:taskID', getTask)
router.patch('/:taskID', updateTask)
router.delete('/:taskID', deleteTask)

module.exports = router