// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    Profile: {
      id: "kjzl6hvfrbw6carzaigt3837vgn7lpb3xm2uuwvshegnrlim6iih0fbojqgh3m0",
      accountRelation: { type: "single" },
    },
    Todo: {
      id: "kjzl6hvfrbw6c6uom1vujndhfioju9t7kvovcjtp31b8lo1xeniq70ydw9156cj",
      accountRelation: { type: "list" },
    },
  },
  objects: {
    Profile: {
      displayName: { type: "string", required: true },
      todos: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "queryConnection",
          model:
            "kjzl6hvfrbw6c6uom1vujndhfioju9t7kvovcjtp31b8lo1xeniq70ydw9156cj",
          property: "postID",
        },
      },
    },
    Todo: {
      tags: { type: "string", required: true },
      title: { type: "string", required: true },
      status: { type: "string", required: true },
      description: { type: "string", required: true },
    },
  },
  enums: {},
  accountData: {
    profile: { type: "node", name: "Profile" },
    todoList: { type: "connection", name: "Todo" },
  },
};
