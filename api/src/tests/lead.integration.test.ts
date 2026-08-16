import { describe, it, expect, beforeEach } from "vitest"
import request from "supertest"
import { app } from "../app"
import { prisma } from "../lib/prisma"

describe("Lead Routes — Integration", () => {

    beforeEach(async ()=>{
        await prisma.lead.deleteMany()
    })
    
    // Test 1: Valid data → 201
    it("should create a lead with valid data", async () => {
        const res = await request(app)
            .post("/leads")
            .send({
                email: "Hemant@example.com",
                name: "Hemant Bhengra",
                company: "Acme Corp"
            })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("status", "pending")
    })

    // Test 2: Invalid data → 400
    it("should return 400 for invalid data", async () => {
        const res = await request(app)
            .post("/leads")
            .send({
                email: "notanemail",
                name: ""
                // missing company
            })
            
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("message", "Validation failed")
    })

    // Test 3: GET all leads → 200 with array
    it("should get all leads", async () => {
        const res = await request(app)
            .get("/leads")

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    it("should get a lead by id", async()=>{
        const creatRes = await request(app)
        .post("/leads")
        .send({
            email: "test@example.com",
            name: "Test User",
            company: "Test Corp"
        })

        const leadId = creatRes.body.id

        const res = await request(app)
        .get(`/leads/${leadId}`)

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(leadId)
        expect(res.body.email).toBe("test@example.com")
    })

    it("should return 404 for non-existent lead", async () => {
        const res = await request(app)
        .get("/leads/nonexistent")

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("message")
    })

    it("should update a lead", async () => {
    const createRes = await request(app)
        .post("/leads")
        .send({
            email: "update@example.com",
            name: "Update Test",
            company: "Update Corp"
        })
    
    const leadId = createRes.body.id
    
    const res = await request(app)
        .put(`/leads/${leadId}`)
        .send({ name: "Updated Name" })
    
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Updated Name")
})

it("should delete a lead", async () => {
    const createRes = await request(app)
        .post("/leads")
        .send({
            email: "delete@example.com",
            name: "Delete Test",
            company: "Delete Corp"
        })
    
    const leadId = createRes.body.id
    
    const res = await request(app)
        .delete(`/leads/${leadId}`)
    
    expect(res.status).toBe(204)
})
})