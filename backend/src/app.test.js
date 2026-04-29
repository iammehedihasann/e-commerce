import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("app", () => {
  it("responds to health checks", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });
});
