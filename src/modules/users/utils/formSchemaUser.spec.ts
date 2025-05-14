import { describe, expect, it } from "vitest";
import { formSchemaUser, formSchemaUserWithPassword } from "./formSchemaUser";

describe("formSchemaUser", () => {
  it("should validate a user with correct data", () => {
    const validUser = {
      first_name: "Juan",
      last_name: "Perez",
      email: "juan@example.com",
      cell_phone_number: "3001234567",
      actions: [],
    };

    const result = formSchemaUser.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("should fail if name is too short", () => {
    const invalidUser = {
      first_name: "J",
      last_name: "Perez",
      email: "juan@example.com",
      cell_phone_number: "3001234567",
    };

    const result = formSchemaUser.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "El nombre debe tener al menos 2 caracteres"
      );
    }
  });

  it("should fail if last name is too short", () => {
    const invalidUser = {
      first_name: "Juan",
      last_name: "Per",
      email: "juan@example.com",
      cell_phone_number: "3001234567",
    };

    const result = formSchemaUser.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "El apellido debe tener al menos 4 caracteres"
      );
    }
  });

  it("should fail if email is invalid", () => {
    const invalidUser = {
      first_name: "Juan",
      last_name: "Perez",
      email: "correo-invalido",
      cell_phone_number: "3001234567",
    };

    const result = formSchemaUser.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "El correo electrónico es incorrecto"
      );
    }
  });

  it("should fail if cell phone number doesn't start with 3", () => {
    const invalidUser = {
      first_name: "Juan",
      last_name: "Perez",
      email: "juan@example.com",
      cell_phone_number: "1234567890",
    };

    const result = formSchemaUser.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "El número celular es incorrecto"
      );
    }
  });
});

describe("formSchemaUserWithPassword", () => {
  it("should validate a user with matching passwords", () => {
    const validUser = {
      first_name: "Juan",
      last_name: "Perez",
      email: "juan@example.com",
      cell_phone_number: "3001234567",
      actions: [],
      passwords: {
        password1: "password123",
        password2: "password123",
      },
    };

    const result = formSchemaUserWithPassword.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("should fail if passwords don't match", () => {
    const invalidUser = {
      first_name: "Juan",
      last_name: "Perez",
      email: "juan@example.com",
      cell_phone_number: "3001234567",
      passwords: {
        password1: "password123",
        password2: "password456",
      },
    };

    const result = formSchemaUserWithPassword.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "Las contraseñas no coinciden"
      );
    }
  });

  it("should fail if password is too short", () => {
    const invalidUser = {
      first_name: "Juan",
      last_name: "Perez",
      email: "juan@example.com",
      cell_phone_number: "3001234567",
      passwords: {
        password1: "12345",
        password2: "12345",
      },
    };

    const result = formSchemaUserWithPassword.safeParse(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "La contraseña debe tener mínimo 6 caracteres"
      );
    }
  });
});
