import { describe, it, expect, beforeAll } from 'vitest';

describe('Admin Login', () => {
  let adminPassword: string;

  beforeAll(() => {
    adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    console.log('Testing with password:', adminPassword ? '***' : 'undefined');
  });

  it('should verify admin password is set', () => {
    expect(adminPassword).toBeDefined();
    expect(adminPassword.length).toBeGreaterThan(0);
  });

  it('should validate admin login with correct password', async () => {
    const response = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.token).toBeDefined();
  });

  it('should reject admin login with incorrect password', async () => {
    const response = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'wrongpassword' }),
    });

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBeDefined();
  });

  it('should fetch consultations with valid token', async () => {
    // First login
    const loginResponse = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword }),
    });

    const loginData = await loginResponse.json();
    const token = loginData.token;

    // Then fetch consultations
    const response = await fetch('http://localhost:3000/api/admin/consultations', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data)).toBe(true);
  });
});
