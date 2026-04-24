import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://revela-api.onrender.com/graphql": {
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
  documents: [
  "features/**/*.graphql",
  "features/**/*.gql",
  "app/**/*.graphql",
  "app/**/*.gql",
],
  generates: {
    "./graphql/generated/": {
      preset: "client",
      config: {
        scalars: {
          ID: "string",
          Float: "number",
        },
      },
    },
  },
}

export default config




// import type { CodegenConfig } from "@graphql-codegen/cli"

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "./graphql/schema.json",
//  documents: [
//   "features/**/*.graphql",
//   "features/**/*.gql",
//   "app/**/*.graphql",
//   "app/**/*.gql",
// ],
//   generates: {
//     "./graphql/generated/": {
//       preset: "client",
//       config: {
//         scalars: {
//           ID: "string",
//           Float: "number",
//         },
//       },
//     },
//   },
// }

// export default config