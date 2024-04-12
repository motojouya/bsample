import type { CodegenConfig } from "@graphql-codegen/cli";
import type { IGraphQLConfig } from "graphql-config";

const codegenConfig: CodegenConfig = {
  schema: "api/schema/*.graphql",
  documents: ["app/**/*.tsx"],
  generates: {
   "./generated/graphql/": {
      preset: "client",
      plugins: [
        // {
        //   add: {
        //     content: `export type DateString = string & { readonly __brand: unique symbol }`,
        //   },
        // },
      ],
      config: {
        strictScalars: true,
        useTypeImports: true,
        skipTypename: true,
        arrayInputCoercion: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        scalars: {
          Date: "DateString",
        },
        enumsAsTypes: true,
      },
    },
    // ...
  },
};

const config: IGraphQLConfig = {
  schema: "api/schema/*.graphql",
  documents: ["app/**/*.tsx"],
  extensions: {
    codegen: codegenConfig,
  },
};

module.exports = config;
