import bcrypt from "bcryptjs";
import { envVars } from "../config/env";
import { prisma } from "../config/prisma";
import { TCreateUser } from "../modules/user/user.interface";

export const seedAdmin = async () => {
    try {
        const isAdminExist = await prisma.user.findUnique({
            where: { email: envVars.ADMIN_EMAIL }
        })

        if (isAdminExist) {
            console.log("Admin already exist");
            return;
        }
        const hashPassword = await bcrypt.hash(
            envVars.ADMIN_PASSWORD,
            Number(envVars.BCRYPT_SALT_ROUND),
        );
        const adminCreatePayload = {
            email: envVars.ADMIN_EMAIL,
            password: hashPassword,
            name: "Pintu Roy",
            designation: "Full-Stack Developer",
            role: "admin",
            status: "active",
            department: "WEB",
            phone: "01837346129",
            zone: "N11",
            eid: "1175",
            joinDate: '2026-09-21T00:00:00.000Z'
        }
        await prisma.user.create({
            data: adminCreatePayload as TCreateUser
        })
        console.log("Admin created successful");

    } catch (error) {
        console.log(error)
    }
}