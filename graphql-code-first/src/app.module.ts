import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";
import { RecipesModule } from "./recipes/recipes.module";

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      transformSchema: (schema) => upperDirectiveTransformer(schema, "upper"),
      installSubscriptionHandlers: true,
    }),
  ],
})
export class AppModule {}
