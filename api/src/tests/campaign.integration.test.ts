import { describe, it, expect } from "vitest"
import request from "supertest"
import { app } from "../app"

describe("Campaign Routes — Integration", () => {
    it("should create a campaign with valid data", async () => {
        const res = await request(app)
            .post("/campaigns")
            .send({
                name: "Q4 Outreach",
                subject: "Quick question",
                body: "Hi there...",
                userId: "user-1"
            })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("createdAt")
        expect(res.body.name).toBe("Q4 Outreach")
    })

    it("should return 400 for invalid data", async()=>{
        const res = await request(app)
        .post("/campaigns")
        .send({
            name:"",
            subject :"Quick question"
             // missing body and userId
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("message","Validation failed")
    })

    it("should get all campaigns", async ()=>{
        const res = await request(app)
        .get("/campaigns")

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    })
})