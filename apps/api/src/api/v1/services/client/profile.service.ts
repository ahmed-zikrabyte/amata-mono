import AppError from "../../../../utils/AppError";
import { IUser } from "../../../../interfaces";
import { HTTP } from "../../../../config/http-status.config";
import { ServiceResponse } from "../../../../typings";

// Mock user data store
const users: IUser[] = [
  {
    id: "u1",
    name: "Aston Lazar",
    email: "aston@example.com",
    password: "hashed_password_1",
    role: "client",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-20"),
  },
  {
    id: "u2",
    name: "Priya Sharma",
    email: "priya@example.com",
    password: "hashed_password_2",
    role: "client",
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-04-07"),
  },
  {
    id: "u3",
    name: "Admin User",
    email: "admin@example.com",
    password: "hashed_password_3",
    role: "admin",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-10"),
  },
];

export const getProfileById = async (id: string): ServiceResponse => {
  try {
    const user = users.find((u) => u.id === id && u.role === "client");
    if (!user) {
      throw new AppError("User not found", 500);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      data: userWithoutPassword,
      message: "User fetched",
      status: HTTP.OK,
      success: true
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
  }
};
