import {CommentNode} from "@/types/common";
import $store from "../../store"

export function addChildComment (this:any, e:CommentNode, comment: CommentNode) {
    console.log(e)
    console.log(comment)
    comment.childs.push(e)


    $store.dispatch('commentsModule/addComment', e);
}
