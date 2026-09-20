import { Request } from "express";
export declare const getPagination: (req: Request) => {
    page: number;
    limit: number;
    skip: number;
};
type TProps = {
    data: any;
    total: number;
    page: number;
    limit: number;
};
export declare const getPaginationResponse: ({ data, total, page, limit }: TProps) => {
    pagination: {
        currentPage: number;
        limit: number;
        totalItems: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    collection: any;
};
export {};
//# sourceMappingURL=pagination.d.ts.map