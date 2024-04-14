import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.media.aora',
    projectId: '661c192748939cdd34b3',
    databaseId: '661c22436c8770cec5cc',
    userCollectionId: '661c2273015027e4e5df',
    videoCollectionId: '661c22a4a0c6c62618ef',
    storageId: '661c240e797e664acb8c',
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
