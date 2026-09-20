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
export declare const ClientService: {
    createClient: typeof createClient;
};
export {};
//# sourceMappingURL=client.service.d.ts.map