import { userProfile } from "./userProfile";

export class UserPost {
    title?: string;
    content?: string;
    posterUserId?: number;
    posterUser?: userProfile;
    blogCreationDate?: Date;
}
