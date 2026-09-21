// export type TCreateUser = {
//   name: string;
//   email: string;
//   password: string;
//   role?: UserRole;
//   status?: UserStatus;
//   avatar?: string;
//   phone?: string;
//   department?: string;
//   designation?: string;
//   zone?: string;
//   eid?: string;
//   joinDate?: Date | null;
//   lastLogin?: Date | null;
//   accessDepartment?: string[];
//   accessPath?: string[];
//   roleDepartment?: string[];
//   accessService?: string[];
//   createdById?: number;
//   teamLeadId?: number;
//   atlId?: number;
// };

import type { Prisma } from "@prisma/client";

export type TCreateUser = Prisma.UserUncheckedCreateInput;
