import { Comments } from "./comments";
import { User } from "./user";

export interface UserComments {
    comments: Comments[];
    user: User
}
