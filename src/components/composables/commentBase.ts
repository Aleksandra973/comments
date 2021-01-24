import {CommentNode} from "@/types/common";
import Vue from "vue";

export function addChildComment (this:any, e:any, comment: CommentNode) {
    //debugger
    comment.childs.push(e)
    this.$forceUpdate();
}
