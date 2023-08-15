
export class User {
    displayName: string = "";
    username: string = "";
    profilePicturePath: string = "";
    userJoinDate: Date;
    followingCount: number = 0;
    followerCount: number = 0;
    messagesSent: number = 0;
    isprivate: boolean = false;
    isVerified: boolean = false;

     constructor(displayName: string, userName: string, profilePicture: string, followingCount: number = 0, followerCount: number = 0, isprivate: boolean = false, isVerified: boolean = false) {
        this.displayName = displayName;
        this.username = userName;
        this.profilePicturePath = profilePicture;
        this.userJoinDate = new Date();
        this.followingCount = followingCount;
        this.followerCount = followerCount;
        this.isprivate = isprivate;
        this.isVerified = isVerified;
    }
}