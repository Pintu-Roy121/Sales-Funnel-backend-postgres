import { ActivationStatus, BillingStatus, Client, ClientClass, ClientType, LeadStatus } from "@prisma/client";

export interface Location {
    id: number;
    division: string;
    district: string;
    thana: string;

    leads?: TCreateLead[];
    clients?: Client[];
}

export interface TCreateLead {
    id?: number;
    userEmail: string;
    // User relations
    kamId: number;
    teamLeadId?: number | null;
    atlId?: number | null;
    createdById?: number | null;

    // Client information
    clientType?: ClientType;
    clientClass?: ClientClass;
    organizationName?: string | null;

    division: string;
    district: string;
    thana: string;
    detailedAddress?: string;

    clientFName: string;
    clientLName: string;
    clientDesignation?: string | null;
    clientMobileNumber: string;
    clientEmail: string;
    clientIndustry?: string | null;
    houseHold?: string | null;

    // Connectivity
    existingPreviousIsp?: string | null;
    connectivityMethod: string;
    serviceClass: string;
    serviceType: string[];
    addOnType?: string;
    packageName?: string | null;

    // Lead metrics
    interactionCount?: number;
    mrcAmount?: number;
    otcAmount?: number;
    expectedClosingMonth: string;
    maturityStage?: string;
    maturityPercentage?: number;
    remarks?: string | null;

    // Activation
    expectedActivationDate?: Date | null;
    lostNote?: string | null;
    wonDocumentUrl?: string | null;
    proposalDocumentUrl?: string | null;

    status?: LeadStatus;
    totalUser?: number;
    activationStatus?: ActivationStatus;
    actualActivationDate?: Date | null;
    startBillingDate?: Date | null;

    isActivationMailSend?: boolean;
    isBillingMailSend?: boolean;

    billingStatus?: BillingStatus;

    // Billing / service
    popName?: string;
    nid?: string | null;
    serviceId?: string | null;
    billingAccess?: string | null;
    myStoreId?: string | null;
    ticketId?: string | null;
    pppoeUser?: string | null;
    pppoePassword?: string | null;
    ispType?: string;

    // Relations
    locationId?: number | null;

    maturityHistories?: MaturityHistory[];
    connectivityLocations?: IConnectivityLocation[];
    billingDetail?: BillingDetail | null;
    technicalDetail?: TechnicalDetail | null;
    location?: Location | null;

    // Timestamps
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MaturityHistory {
    id?: number;
    leadId?: number;

    stage: string;
    percentage: number;

    oldMrcAmount?: number | null;
    newMrcAmount?: number | null;

    oldOtcAmount?: number | null;
    newOtcAmount?: number | null;

    oldExpectedClosingMonth?: string | null;
    newExpectedClosingMonth?: string | null;

    updatedAt?: Date;
    note?: string;

    lead?: TCreateLead;
}

export interface IConnectivityLocation {
    id?: number;
    leadId?: number;

    serviceName: string;
    address: string;
    packageName?: string;
    remarks?: string;

    mrc?: number;
    otc?: number;
    qty?: number;
    tkPerMb?: number;

    lead?: TCreateLead;
}

export interface BillingDetail {
    id?: number;
    leadId?: number;

    firstName?: string | null;
    lastName?: string | null;
    designation?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    detailedAddress?: string | null;
    paymentMethod?: string | null;
    trxId?: string | null;
    activationDate?: string | null;

    lead?: TCreateLead;
}

export interface TechnicalDetail {
    id?: number;
    leadId?: number;

    firstName?: string | null;
    lastName?: string | null;
    designation?: string | null;
    phoneNumber?: string | null;
    email?: string | null;

    lead?: TCreateLead;
}

export interface CreateLeadPayload {
    kamId: number;
    userEmail: string
    teamLeadId?: number;
    atlId?: number;

    clientType?: ClientType;
    clientClass?: ClientClass;

    organizationName?: string;

    division: string;
    district: string;
    thana: string;
    detailedAddress?: string;

    clientFName: string;
    clientLName: string;
    clientDesignation?: string;
    clientMobileNumber: string;
    clientEmail: string;
    clientIndustry?: string;
    houseHold?: string;

    existingPreviousIsp?: string;
    connectivityMethod: string;
    serviceClass: string;
    serviceType: string[];

    addOnType?: string;
    packageName?: string;

    mrcAmount?: number;
    otcAmount?: number;
    expectedClosingMonth: string;

    remarks?: string;

    expectedActivationDate?: Date;
    lostNote?: string;
    wonDocumentUrl?: string;
    proposalDocumentUrl?: string;

    totalUser?: number;

    popName?: string;
    nid?: string;
    serviceId?: string;
    billingAccess?: string;
    myStoreId?: string;
    ticketId?: string;
    pppoeUser?: string;
    pppoePassword?: string;
    ispType?: string;

    locationId?: number;
}


import { Prisma } from "@prisma/client";

export type Lead = Prisma.LeadGetPayload<{}>;

// const lead = {
//     "clientClass": "new",
//     "clientType": "CORP",
//     "organizationName": "ITC",
//     "division": "Dhaka",
//     "district": "Dhaka",
//     "thana": "Mirpur",
//     "houseHold": "",
//     "detailedAddress": "",
//     "clientFName": "Mehedi",
//     "clientLName": "Hassan",
//     "clientDesignation": "IT Manager",
//     "clientMobileNumber": "01521542122",
//     "clientEmail": "mehedihassan4467@gmail.com",
//     "clientIndustry": "Advertising Firm",
//     "existingPreviousIsp": "Link 3",
//     "connectivityMethod": "Fiber from Agni POP ONU",
//     "serviceClass": "Internet",
//     "serviceType": "",
//     "packageName": "",
//     "mrcAmount": 9120,
//     "otcAmount": 1600,
//     "expectedClosingMonth": "Aug 2026",
//     "maturityStage": "Lead Generated",
//     "remarks": "test remarks",
//     "status": "open",
//     "lostNote": "",
//     "addOnType": "none",
//     "mainQty": "",
//     "mainTkPerMb": "",

//     "ispType": "",
//     "totalUser": "",
//     "kam": "6a27a743aa74e16ce2976d39",
//     "connectivityLocations": [
//         {
//             "packageName": "",
//             "serviceName": "Reseller Partner",
//             "address": "uttara sector 12, Dhaka bangladesh",
//             "mrc": 9000,
//             "otc": 1500,
//             "qty": 9,
//             "tkPerMb": 1000,
//             "remarks": "test note"
//         },
//         {
//             "packageName": "",
//             "serviceName": "Own Retail",
//             "address": "Shewrapara, Mirpur 10, Dhakaa ",
//             "mrc": 120,
//             "otc": 100,
//             "qty": 10,
//             "tkPerMb": 12,
//             "remarks": "test note"
//         }
//     ],
// }
