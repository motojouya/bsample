import type { CodegenConfig } from "@graphql-codegen/cli";
import type { IGraphQLConfig } from "graphql-config";
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'
 
//schema: "./api/schema/user.graphql",
const codegenConfig: CodegenConfig = {
  schema: "./api/schema/*.graphql",
  generates: {
    // "./generated/graphql/": defineConfig()
    "./generated/graphql/resolver.ts": {
      // preset: "client",
      plugins: [
        "typescript",
        "typescript-resolvers",
        // {
        //   add: {
        //     content: `export type DateString = string & { readonly __brand: unique symbol }`,
        //   },
        // },
      ],
      // config: {
      //   strictScalars: true,
      //   useTypeImports: true,
      //   skipTypename: true,
      //   arrayInputCoercion: true,
      //   avoidOptionals: {
      //     field: true,
      //     inputValue: false,
      //     object: true,
      //     defaultValue: false,
      //   },
      //   scalars: {
      //     Date: "DateString",
      //   },
      //   enumsAsTypes: true,
      // },
    },
    // ...
  },
};

export default codegenConfig;

// const config: IGraphQLConfig = {
//   schema: "api/schema/*.graphql",
//   extensions: {
//     codegen: codegenConfig,
//   },
// };
// 
// module.exports = config;
