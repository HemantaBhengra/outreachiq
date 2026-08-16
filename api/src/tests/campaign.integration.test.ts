import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../app";
import { prisma } from "../lib/prisma";

describe("Campaign Routes — Integration", () => {
  beforeEach(async () => {
    await prisma.campaign.deleteMany();
  });

  it("should create a campaign with valid data", async () => {
    const res = await request(app).post("/campaigns").send({
      name: "Q4 Outreach",
      subject: "Quick question",
      body: "Hi there...",
      userId: "user-1",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body.name).toBe("Q4 Outreach");
  });

  it("should return 400 for invalid data", async () => {
    const res = await request(app).post("/campaigns").send({
      name: "",
      subject: "Quick question",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Validation failed");
  });

  it("should get all campaigns", async () => {
    const res = await request(app).get("/campaigns");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a campaign by id", async () => {
    const createRes = await request(app).post("/campaigns").send({
      name: "Q4 Outreach",
      subject: "Quick question",
      body: "Hi there...",
      userId: "user-1",
    });

    const campaignId = createRes.body.id;
    const res = await request(app).get(`/campaigns/${campaignId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(campaignId);
  });

  it("should return 404 for non-existent campaign", async () => {
    const res = await request(app).get("/campaigns/nonexistent");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message");
  });

  it("should update a campaign", async () => {
    const createRes = await request(app).post("/campaigns").send({
      name: "Update Test Campaign",
      subject: "Test Subject",
      body: "Test Body",
      userId: "user-1",
    });

    const campaignId = createRes.body.id;
    const res = await request(app)
      .put(`/campaigns/${campaignId}`)
      .send({ name: "Updated Test Campaign" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated Test Campaign");
  });

  it("should delete a campaign", async () => {
    const createRes = await request(app).post("/campaigns").send({
      name: "Delete Test Campaign",
      subject: "Test Subject",
      body: "Test Body",
      userId: "user-1",
    });

    const campaignId = createRes.body.id;
    const res = await request(app).delete(`/campaigns/${campaignId}`);

    expect(res.status).toBe(204);
  });
});
