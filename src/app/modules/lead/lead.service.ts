import { prisma } from "@/app/config/prisma";
import { Request } from "express";
import { TCreateLead } from "./lead.type";

const createLead = async (req: Request) => {
    // const { id } = req?.user
    const { kamId, ...rest } = req.body as TCreateLead;
    const isUserExist = await prisma.user.findUnique({
        where: { id: kamId }
    })

    if (!isUserExist) {
        throw new Error("User not found")
    }


    const createLeadPayload = {
        ...rest,
        kamId,
        teamLeadId: isUserExist.teamLeadId,
        atlId: isUserExist.atlId,
        // createdById: id
    }
    const result = createLeadPayload
    return result
}

export const LeadService = {
    createLead
}