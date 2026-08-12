import { describe, it, expect } from "vitest"
import request from "supertest"
import { app } from "../app"

describe("Lead Routes — Integration", () => {
    
    // Test 1: Valid data → 201
    it("should create a lead with valid data", async () => {
        const res = await request(app)
            .post("/leads")
            .send({
                email: "john@example.com",
                name: "John Doe",
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
})