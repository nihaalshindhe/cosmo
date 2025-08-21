import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Concern from './models/Concern.js'
import Treatment from './models/Treatment.js'
import ConcernTreatment from './models/ConcernTreatment.js'
import Package from './models/Package.js'

dotenv.config()
await mongoose.connect(process.env.MONGO_URI)

await Concern.deleteMany({})
await Treatment.deleteMany({})
await ConcernTreatment.deleteMany({})
await Package.deleteMany({})

const concerns = await Concern.insertMany([
    { name: 'acne scars' },
    { name: 'dark circles' },
    { name: 'double chin' }
])

const treatments = await Treatment.insertMany([
    { name: 'Microneedling' },
    { name: 'Chemical Peel' },
    { name: 'Laser Resurfacing' },
    { name: 'Under-eye Filler' },
    { name: 'PRP Under-eye' },
    { name: 'HIFU' },
    { name: 'Kybella' }
])

const mappings = [
    { concern: concerns[0]._id, treatment: treatments[0]._id },
    { concern: concerns[0]._id, treatment: treatments[1]._id },
    { concern: concerns[0]._id, treatment: treatments[2]._id },
    { concern: concerns[1]._id, treatment: treatments[3]._id },
    { concern: concerns[1]._id, treatment: treatments[4]._id },
    { concern: concerns[2]._id, treatment: treatments[5]._id },
    { concern: concerns[2]._id, treatment: treatments[6]._id }
]
await ConcernTreatment.insertMany(mappings)

await Package.insertMany([
    { clinic_name: 'Glow Clinic', package_name: 'Microneedling Basic', treatment: treatments[0]._id, price: 200 },
    { clinic_name: 'DermaCare', package_name: 'Chemical Peel Advanced', treatment: treatments[1]._id, price: 300 },
    { clinic_name: 'Skin Renew', package_name: 'Laser Resurfacing', treatment: treatments[2]._id, price: 500 },
    { clinic_name: 'Aesthetic Hub', package_name: 'Under-eye Filler', treatment: treatments[3]._id, price: 350 },
    { clinic_name: 'Youth Clinic', package_name: 'PRP Under-eye', treatment: treatments[4]._id, price: 400 },
    { clinic_name: 'SlimCare', package_name: 'HIFU Double Chin', treatment: treatments[5]._id, price: 600 },
    { clinic_name: 'Cosmetic Pro', package_name: 'Kybella Chin Reduction', treatment: treatments[6]._id, price: 700 }
])

console.log('Database seeded')
process.exit()
