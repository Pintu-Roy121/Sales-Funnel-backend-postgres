import { Prisma } from "@prisma/client";

export type TCreateLead = Prisma.LeadGetPayload<{}>;

const lead = {
    "clientClass": "new",
    "clientType": "CORP",
    "organizationName": "ITC",
    "division": "Dhaka",
    "district": "Dhaka",
    "thana": "Mirpur",
    "houseHold": "",
    "detailedAddress": "",
    "clientFName": "Mehedi",
    "clientLName": "Hassan",
    "clientDesignation": "IT Manager",
    "clientMobileNumber": "01521542122",
    "clientEmail": "mehedihassan4467@gmail.com",
    "clientIndustry": "Advertising Firm",
    "existingPreviousIsp": "Link 3",
    "connectivityMethod": "Fiber from Agni POP ONU",
    "serviceClass": "Internet",
    "serviceType": "",
    "packageName": "",
    "mrcAmount": 9120,
    "otcAmount": 1600,
    "expectedClosingMonth": "Aug 2026",
    "maturityStage": "Lead Generated",
    "remarks": "test remarks",
    "status": "open",
    "lostNote": "",
    "addOnType": "none",
    "mainQty": "",
    "mainTkPerMb": "",

    "ispType": "",
    "totalUser": "",
    "kam": "6a27a743aa74e16ce2976d39",
    "connectivityLocations": [
        {
            "packageName": "",
            "serviceName": "Reseller Partner",
            "address": "uttara sector 12, Dhaka bangladesh",
            "mrc": 9000,
            "otc": 1500,
            "qty": 9,
            "tkPerMb": 1000,
            "remarks": "test note"
        },
        {
            "packageName": "",
            "serviceName": "Own Retail",
            "address": "Shewrapara, Mirpur 10, Dhakaa ",
            "mrc": 120,
            "otc": 100,
            "qty": 10,
            "tkPerMb": 12,
            "remarks": "test note"
        }
    ],
    // "serviceBreakdown": []
}

//Create Lead flow-new added
// 1. Location
//       ↓
// 2. Lead
//       ↓
// 3. MaturityHistory
//       ↓
// 4. ConnectivityLocation
//       ↓
// 5. BillingDetail
//       ↓
// 6. TechnicalDetail
//============================================
//Relation tables
// users
//   │
//   ├── leads.kam_id
//   ├── leads.team_lead_id
//   ├── leads.atl_id
//   └── leads.created_by_id
//           │
//           ▼
//         leads
//           │
//           ├── maturity_histories
//           │
//           ├── connectivity_locations
//           │
//           ├── billing_details
//           │
//           ├── technical_details
//           │
//           └── service_breakdowns
//           │
//           └── client_services--- already have