import {CommentNode} from "@/types/common";
import $store from "../../store"

export function addChildComment (this:any, e:CommentNode, comment: CommentNode): void {
    console.log(e)
    console.log(comment)
    comment.childs.push(e)
    $store.dispatch('commentsModule/addComment', e);
}

export function  deleteChildComment(e: CommentNode, comments: CommentNode[]): void {
    let index = comments.indexOf(e)
    comments.splice(index, 1)
    $store.dispatch('commentsModule/deleteComment', e.id);
}

export function editChildComment(e: CommentNode, comments: CommentNode[]): void {
    let item = comments.filter(i => i.id === e.id);
    item[0].message = e.message
    $store.dispatch('commentsModule/editComment', e)
}

export function getRandomName(): string {
    const names = [
        "Ann Vin",
        "Tom Roy",
        "Bill Anderson",
        "Yan Brooks",
        "Lisa Wooten",
        "Mike Grant"
    ];
    const random = Math.round(Math.random() * names.length);
    return names[random];
};
