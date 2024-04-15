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

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId } = config

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setPlatform(platform)

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
            databaseId,
            userCollectionId,
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

/**
 * Attempts to sign in a user with the provided email and password.
 * 
 * This function uses the Appwrite SDK to create an email session for the user,
 * which is a necessary step for authenticating a user in the Appwrite backend.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * 
 * @returns {Promise<Object>} A promise that resolves to the session object if the sign-in is successful.
 * The session object contains information about the user's session, such as the session ID.
 * If the sign-in fails, the promise is rejected with an error.
 * 
 * @throws {Error} Will throw an error if the email or password is missing, or if there is an issue with the sign-in process.
 * 
 * @example
 * signIn("user@example.com", "password123")
 *   .then(session => console.log("Signed in successfully", session))
 *   .catch(error => console.error("Failed to sign in", error));
 */
export async function signIn(email, password) {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieves the current user's information from the Appwrite database.
 *
 * This function first attempts to get the current account details using the Appwrite SDK's `account.get()` method.
 * If successful, it then queries the Appwrite database for a document matching the current account's ID within the user collection.
 * The function returns the first document found that matches the current account's ID, which should represent the current user's information.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the current user's information if successful.
 * The object includes details such as the user's account ID, email, username, and avatar URL.
 * If the function fails to retrieve the current user's information, the promise is rejected with an error.
 *
 * @example
 * getCurrentUser()
 *   .then(user => console.log("Current user:", user))
 *   .catch(error => console.error("Failed to get current user:", error));
 */
export async function getCurrentUser() {
    try {
        const currenAccount = await account.get();

        if (!currenAccount) {
            throw new Error;
        }

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currenAccount.$id)]
        );

        if (!currentUser) {
            throw new Error;
        }

        return currentUser.documents[0];
    } catch (error) {
        console.error(error);
    }
}

/**
 * Retrieves all posts from the Appwrite database.
 *
 * This function uses the Appwrite SDK to list all documents in the specified video collection.
 * It returns an array of documents, each representing a post. The documents include details
 * such as the post's ID, title, description, and any other relevant information stored in the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of post documents.
 * Each document in the array contains details about a post, such as its ID, title, description, etc.
 * If the function fails to retrieve the posts, the promise is rejected with an error.
 *
 * @example
 * getAllPosts()
 *   .then(posts => console.log("All posts:", posts))
 *   .catch(error => console.error("Failed to get all posts:", error));
 */
export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}
