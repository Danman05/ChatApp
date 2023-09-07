import { userProfile } from "./userProfile";

export class UserPost {
    postId?: number;
    title?: string;
    content?: string;
    posterUserId?: number;
    posterUser?: userProfile;
    blogCreationDate?: Date;
}
