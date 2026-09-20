"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationResponse = exports.getPagination = void 0;
const getPagination = (req) => {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;
    return {
        page,
        limit,
        skip,
    };
};
exports.getPagination = getPagination;
const getPaginationResponse = ({ data, total, page, limit }) => {
    const totalPages = Math.ceil(total / limit);
    return {
        pagination: {
            currentPage: page,
            limit,
            totalItems: total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        },
        collection: data,
    };
};
exports.getPaginationResponse = getPaginationResponse;
//# sourceMappingURL=pagination.js.map