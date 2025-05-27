export type CrabonCreditCertificate = {
    certificate_id: string
    issued_by: string
    issued_on: Date
    project_title: string
    project_description: string
    verified_by: string
    verified_on: Date
    price: number
    carbon_reduction_amount: number
    certification_standard: string    
    vintage: Date
    transaction_history: TransactionHistory
    retirement_status: boolean
    social_benefits: string
};