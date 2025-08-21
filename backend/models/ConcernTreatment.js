import mongoose from 'mongoose'

const ConcernTreatmentSchema = new mongoose.Schema({
    concern: { type: mongoose.Schema.Types.ObjectId, ref: 'Concern' },
    treatment: { type: mongoose.Schema.Types.ObjectId, ref: 'Treatment' }
})

export default mongoose.model('ConcernTreatment', ConcernTreatmentSchema)
