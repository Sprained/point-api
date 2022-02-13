import * as mongoose from 'mongoose'

export const CompanySchema = new mongoose.Schema({
    corporateName: String,
    cnpj: { type: String, unique: true, maxlength: 14, minlength: 14 },
    phone: { type: String, maxlength: 11, minlength: 10 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    role: String
}, {
    timestamps: true,
    collection: 'companies'
})