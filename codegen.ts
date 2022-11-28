import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clal25wdu1f9w01uj7d440y64/master',
    documents: 'graphql/*.graphql',
    generates: {
        './generated/graphql.tsx/': {
            preset: 'client',
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};

export default config;
