import { prisma } from "@/app/config/prisma";
import AppError from "@/app/errorHelpers/appError";
import { StatusCodes } from "http-status-codes";
import { TCreateLead } from "./lead.type";

const createLead = async (payload: TCreateLead) => {
    const {
        kamId,
        userEmail,
        division,
        district,
        thana,
        connectivityLocations,
        billingDetail,
        technicalDetail,
        maturityHistories,
        location: _location,
        locationId: _locationId,
        ...rest
    } = payload;

    // const isKAMUserExist = await prisma.user.findUnique({
    //     where: { id: kamId }
    // })

    const isUserExist = await prisma.user.findUnique({
        where: { email: userEmail }
    })

    if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found")
    }

    const { teamLeadId, atlId, role, id } = isUserExist

    if (role === "employee" && kamId !== id) {
        throw new AppError(StatusCodes.FORBIDDEN, "Employees can only assign leads to themselves.")
    }

    const location = await prisma.location.findUnique({
        where: {
            division_district_thana: {
                division,
                district,
                thana,
            },
        },
        select: {
            id: true,
        },
    });

    // if (!location) {
    //     throw new AppError(
    //         StatusCodes.NOT_FOUND,
    //         "Location not found for the given division, district and thana."
    //     );
    // }

    // const createLeadPayload = {
    //     ...rest,
    //     kamId,
    //     teamLeadId,
    //     atlId,
    //     createdById: id,
    //     locationId: location.id ?? null
    // }
    // const result = createLeadPayload
    // const result = await prisma.lead.create({ data: createLeadPayload })
    const result = await prisma.$transaction(async (tnx) => {
        const location = await tnx.location.upsert({
            where: {
                division_district_thana: {
                    division,
                    district,
                    thana,
                },
            },
            update: {},
            create: {
                division,
                district,
                thana,
            },
        });

        // 2. Create Lead and connect Location
        const lead = await tnx.lead.create({
            data: {
                ...rest,

                division,
                district,
                thana,

                kamId: kamId ?? null,
                teamLeadId: teamLeadId ?? null,
                atlId: atlId ?? null,
                createdById: id,

                locationId: location.id,

                ...(connectivityLocations?.length
                    ? {
                        connectivityLocations: {
                            create: connectivityLocations.map((item) => ({
                                serviceName: item.serviceName,
                                address: item.address,
                                packageName:
                                    item.packageName ?? "",
                                remarks: item.remarks ?? "",
                                mrc: item.mrc ?? 0,
                                otc: item.otc ?? 0,
                                qty: item.qty ?? 0,
                                tkPerMb: item.tkPerMb ?? 0,
                            })),
                        },
                    }
                    : {}),
            },

            include: {
                connectivityLocations: true,
            },
        });

        return lead;
    });

    return result
}

export const LeadService = {
    createLead
}