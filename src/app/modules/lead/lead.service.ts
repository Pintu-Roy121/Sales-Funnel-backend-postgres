import { prisma } from "@/app/config/prisma";
import AppError from "@/app/errorHelpers/appError";
import { getPagination, getPaginationResponse } from "@/app/utils/pagination";
import { Request } from "express";
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
    const result = await prisma.$transaction(async (tnx) => {

        let location = await tnx.location.findUnique({
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

        if (!location) {
            location = await tnx.location.create({
                data: {
                    division,
                    district,
                    thana,
                },
            });
        }

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

                // ...(connectivityLocations?.length
                //     ? {
                //         connectivityLocations: {
                //             create: connectivityLocations.map((item) => ({
                //                 serviceName: item.serviceName,
                //                 address: item.address,
                //                 packageName:
                //                     item.packageName ?? "",
                //                 remarks: item.remarks ?? "",
                //                 mrc: item.mrc ?? 0,
                //                 otc: item.otc ?? 0,
                //                 qty: item.qty ?? 0,
                //                 tkPerMb: item.tkPerMb ?? 0,
                //             })),
                //         },
                //     }
                //     : {}),
            },
            // include: {
            //     connectivityLocations: true
            // }

        });

        if (payload.connectivityLocations?.length) {
            await tnx.connectivityLocation.createMany({
                data: payload.connectivityLocations.map((item) => ({
                    leadId: lead.id,
                    serviceName: item.serviceName,
                    address: item.address,
                    packageName: item.packageName ?? "",
                    remarks: item.remarks ?? "",
                    mrc: item.mrc ?? 0,
                    otc: item.otc ?? 0,
                    qty: item.qty ?? 0,
                    tkPerMb: item.tkPerMb ?? 0,
                })),
            });
        }

        return lead;
    });

    return result
}

const getAll = async (req: Request) => {
    const { page, limit, skip } = getPagination(req)

    const total = await prisma.lead.count()

    const data = await prisma.lead.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
            connectivityLocations: true,
            location: true
        }

    })
    const result = getPaginationResponse({
        data,
        total,
        page,
        limit
    })
    return result
}

export const LeadService = {
    createLead,
    getAll
}