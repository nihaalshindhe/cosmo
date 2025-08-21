import mongoose from 'mongoose'

const PackageSchema = new mongoose.Schema({
    clinic_name: String,
    package_name: String,
    treatment: { type: mongoose.Schema.Types.ObjectId, ref: 'Treatment' },
    price: Number
})

export default mongoose.model('Package', PackageSchema)
