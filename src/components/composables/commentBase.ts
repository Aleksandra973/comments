import {CommentNode} from "@/types/common";
import Vue from "vue";
import $store from "../../store"

export function addChildComment (this:any, e:any, comment: CommentNode) {
   // debugger

    comment.childs.push(e)

    $store.dispatch('commentsModule/addComment', {
        newItem: e
    });
}
