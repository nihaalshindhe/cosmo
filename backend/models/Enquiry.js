import mongoose from 'mongoose'

const EnquirySchema = new mongoose.Schema({
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    user_name: String,
    user_email: String,
    message: String,
    created_at: { type: Date, default: Date.now }
})

export default mongoose.model('Enquiry', EnquirySchema)
