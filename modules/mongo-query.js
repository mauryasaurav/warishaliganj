export const listAggregation = ({ page, limit }) => {
  page = page ? page : 1;
  limit = parseInt(limit ? limit : 50);
  page = page - 1;
  return [
    {
      $match: {
        isDeleted: false,
        isBlocked: false,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $facet: {
        total: [
          {
            $count: "total",
          },
          {
            $addFields: {
              pages: { $ceil: { $divide: ["$total", limit] } },
            },
          },
        ],
        data: [
          {
            $skip: page * limit,
          },
          {
            $limit: limit,
          },
        ],
      },
    },
  ];
};

export const listAggregationWithoutUnblock = ({ page, limit }) => {
  page = page ? page : 1;
  limit = parseInt(limit ? limit : 50);
  page = page - 1;
  return [
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $facet: {
        total: [
          {
            $count: "total",
          },
          {
            $addFields: {
              pages: { $ceil: { $divide: ["$total", limit] } },
            },
          },
        ],
        data: [
          {
            $skip: page * limit,
          },
          {
            $limit: limit,
          },
        ],
      },
    },
  ];
};
