import { Request } from "express";
import { TClient } from "./client.interface";
declare const createClient: (payload: TClient) => Promise<{
    id: number;
    clientOldId: string;
    clientType: string | null;
    clientFName: string;
    clientLName: string;
    companyName: string;
    email: string;
    phone: string;
    division: string;
    district: string;
    thana: string;
    fullAddress: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllClient: (payload: Request) => Promise<{
    pagination: {
        currentPage: number;
        limit: number;
        totalItems: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    collection: any;
}>;
export declare const ClientService: {
    createClient: typeof createClient;
    getAllClient: typeof getAllClient;
};
export {};
//# sourceMappingURL=client.service.d.ts.map