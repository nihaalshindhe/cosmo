import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { body, validationResult } from 'express-validator'
import Treatment from "./models/Treatment.js";
import Concern from './models/Concern.js'

import ConcernTreatment from './models/ConcernTreatment.js'
import Package from './models/Package.js'
import Enquiry from './models/Enquiry.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))

const synonyms = {
    "under eye bags": "dark circles",
    "pimples": "acne scars",
    "chin fat": "double chin"
}

app.get('/search', async (req, res) => {
    let { concern } = req.query
    if (!concern) return res.json({})
    concern = synonyms[concern.toLowerCase()] || concern

    const c = await Concern.findOne({ name: new RegExp(concern, 'i') })
    if (!c) return res.json({ treatments: [], packages: [] })

    const mappings = await ConcernTreatment.find({ concern: c._id }).populate('treatment')
    const treatments = mappings.map(m => m.treatment)

    const packages = await Package.find({ treatment: { $in: treatments.map(t => t._id) } })

    res.json({ concern: c.name, treatments, packages })
})


app.post('/enquiries',
    [
        body('user_name').notEmpty().withMessage('Name required'),
        body('user_email').isEmail().withMessage('Valid email required'),
        body('message').isLength({ min: 5 }).withMessage('Message too short')
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        const { package_id, user_name, user_email, message } = req.body
        await Enquiry.create({ package: package_id, user_name, user_email, message })
        res.json({ success: true })
    }
)


app.get('/admin/enquiries', async (req, res) => {
    const enquiries = await Enquiry.find().populate('package')
    res.json(enquiries)
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
