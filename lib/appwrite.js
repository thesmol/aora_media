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

// API
/**
 * Creates a new user account with the provided email, password, and username.
 * 
 * This function performs several steps:
 * 1. Creates a new account using the provided email, password, and username.
 * 2. Generates an avatar URL for the new user using their username.
 * 3. Signs in the new user to create an email session.
 * 4. Creates a new document in the database for the new user, including their account ID, email, username, and avatar URL.
 * 
 * @param {string} email - The email address of the new user.
 * @param {string} password - The password for the new user.
 * @param {string} username - The username of the new user.
 * 
 * @returns {Promise<Object>} A promise that resolves to the new user document if the account creation is successful.
 * The new user document contains information about the new user, such as their account ID, email, username, and avatar URL.
 * If the account creation fails, the promise is rejected with an error.
 * 
 * @throws {Error} Will throw an error if the email, password, or username is missing, if there is an issue with the account creation,
 * or if there is an issue with the avatar generation or database document creation.
 * 
 * @example
 * createUser("user@example.com", "password123", "username")
 *   .then(newUser => console.log("User created successfully", newUser))
 *   .catch(error => console.error("Failed to create user", error));
 */
export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) {
            throw new Error;
        }

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
