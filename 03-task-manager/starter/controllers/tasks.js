const Task = require('../models/Tasks')
const asyncWrapper = require('../middlewares/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks }) 
   
})

const createTask = asyncWrapper (async (req, res) => {
    const task = await Task.create(req.body) 
    res.status(201).json(task)    
})

const getTask = asyncWrapper(async (req, res, next) => {
    const taskID = req.params.taskID
    const task = await Task.findOne({ _id: taskID });
    if(!task) {
        const error = createCustomError(`No task with id ${taskID}`, 404)
        return next(error)
        // return res.status(404).json({msg: `No task with id ${taskID}`})
    }
    res.status(200).json({success: true, data: task})
})

const updateTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.taskID
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {new: true, runValidators: true})
    if (!task) {
        return next(createCustomError(`No task with id ${taskID}`, 404))
    }
    res.status(200).json({data: task})
})
const deleteTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.taskID
    const task = await Task.findOneAndDelete({ _id: taskID })
    if(!task) {
        return next(createCustomError(`No task with id ${taskID}`, 404))
    }
    res.status(200).json({msg: `task with id ${taskID} has been deleted`})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
