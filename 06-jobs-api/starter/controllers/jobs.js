const StatusCodes = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({data: jobs})
}

const getJob = async (req, res) => {
    try {
        const job = await Job.findOne({_id: req.params.id, createdBy: req.user.userID})
        if(!job) {
            throw new NotFoundError('That job doesnt exist.')
        }
        res.status(StatusCodes.OK).json({job})
    } catch (error) {
        throw new NotFoundError('That job doesnt exist.')
    }
}

const createJob = async (req, res) => {
    const {company, position} = req.body
    const job = await Job.create({company, position, createdBy: req.user.userID})
    res
    .status(StatusCodes.CREATED)
    .json({ job })
}

const UpdateJob = async (req, res) => {
    const {body:{company}, body:{position}, params:{id}, user:{userID}} = req
    if (!company || !position) {
        throw new BadRequestError('Please fill company and position.')
    }
    try {
        const job = await Job.findByIdAndUpdate(
            {_id: id, createdBy: userID},
            req.body,
            {new: true, runValidators: true}
        )
        res.status(StatusCodes.OK).json({job})
    } catch (error) {
        throw new NotFoundError('That job doesnt exist.')
    }
}

const deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete({_id: req.params.id, createdBy: req.user.userID})
        res.status(StatusCodes.OK).json({msg: 'job has been deleted.'})
    } catch (error) {
        throw new NotFoundError('That job doesnt exist.')
    }
}

module.exports = {getAllJobs, getJob, createJob, UpdateJob, deleteJob}