export class UserDB {
    userId?: number;
    username?: string = "";
    password?: string = "";
    displayName?: string = "";
    profilePicturePath?: string = "";
    isPrivate?: boolean = false;
    isVerified?: boolean = false;
    accountCreationDate?: Date;
}
