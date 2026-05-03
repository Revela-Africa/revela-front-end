// import type { CodegenConfig } from "@graphql-codegen/cli"

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: {
//     [process.env.NEXT_PUBLIC_API_URL as string]: {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   },
//   documents: [
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



import type { CodegenConfig } from "@graphql-codegen/cli"
import dotenv from "dotenv"


dotenv.config({ path: ".env.local" })

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined")
}

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [API_URL]: {
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

