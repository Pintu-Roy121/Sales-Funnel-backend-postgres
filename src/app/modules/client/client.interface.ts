// export interface IClient {
//   id: number;
//   clientOld: string;
//   // clientId?: string | null;
//   clientType?: string | null;
//   clientFName: string;
//   clientLName: string;
//   companyName: string;
//   email: string;
//   phone: string;
//   division: string;
//   district: string;
//   thana: string;
//   fullAddress: string;
//   status: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

import { Prisma } from "@prisma/client";

export type TClient = Prisma.clientGetPayload<{}>;
