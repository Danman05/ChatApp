
export class User {
    userID: number = 0;
    username: string = "";
    password: string = "";
    displayName: string = "";
    profilePicturePath?: string = "";
    followingCount: number = 0;
    followerCount: number = 0;
    messagesSent: number = 0;
    isprivate: boolean = false;
    isVerified: boolean = false;
    accountCreationDate: Date;

    constructor(displayName: string, userName: string, password: string, profilePicture: string, followingCount: number = 0, followerCount: number = 0, isprivate: boolean = false, isVerified: boolean = false) {
        this.username = userName;
        this.password = password;
        this.displayName = displayName;
        this.profilePicturePath = profilePicture;
        this.followingCount = followingCount;
        this.followerCount = followerCount;
        this.isprivate = isprivate;
        this.isVerified = isVerified;
        this.accountCreationDate = new Date();
    }
}
