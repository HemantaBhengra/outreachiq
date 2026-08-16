
export type LeadStatus =  "pending" | "contacted" | "replied"


export interface Lead {
    id: string
    email:string
    name:string
    company:string
    status:LeadStatus
    createdAt:Date
}


export type CreateLeadInput = Omit<Lead,'id'|'createdAt'|'status'>

