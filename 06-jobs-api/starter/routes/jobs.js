const express = require('express')
const router = express.Router()

const {
    getAllJobs,
    getJob,
    createJob,
    UpdateJob,
    deleteJob
} = require('../controllers/jobs')

router.route('/').get(getAllJobs).post(createJob)

router.route('/:id').get(getJob).patch(UpdateJob).delete(deleteJob)

module.exports = router