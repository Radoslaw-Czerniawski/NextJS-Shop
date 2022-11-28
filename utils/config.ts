export const getStage = () => {
    switch (process.env.APP_STAGE) {
        case 'production':
            return process.env.APP_STAGE;
        case 'develop':
            return process.env.APP_STAGE;
        default:
            return 'local';
    }
};

export const getServerPort = () =>
    parseInt(process.env.APP_SERVER_PORT ?? '3000', 10);

export const getBasePath = () =>
    process.env.APP_PATH ?? 'http://localhost:3000';
export const getServerPath = () =>
    process.env.SERVER_PATH ?? 'http://localhost:4000';

export const getApiPath = () => `${getBasePath()}/api`;

export const getDBPath = () => `${process.env.NEXT_PUBLIC_GRAPHQL_CONTENTAPI}`;
