import Fastify from "fastify"
import { ApolloServer, BaseContext } from "@apollo/server"
import fastifyApollo, { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify'
import { readFileSync } from 'fs';

import { resolvers } from 'resolver';

const typeDefs = readFileSync('../api/schema/schema.graphql', { encoding: 'utf-8' });

export const run = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const app = Fastify({
    logger: true,
  });

  const apollo = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(app)],
  });

  await apollo.start();
  await app.register(fastifyApollo(apollo));

  try {
    await app.listen({ port: 65535 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`🚀  Server ready`);
};
