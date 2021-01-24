import { CommentNode} from "@/types/common";

export interface CommentsState {
    comments: CommentNode[]
}
export function state(): CommentsState  {
    return  {
        comments: []
    }
}



export default state;