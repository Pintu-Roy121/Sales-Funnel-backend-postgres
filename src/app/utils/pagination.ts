import { Request } from "express";

export const getPagination = (req: Request) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

type TProps = {
  data: any;
  total: number;
  page: number;
  limit: number;
};

export const getPaginationResponse = ({ data, total, page, limit }: TProps) => {
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
