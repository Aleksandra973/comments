import {uuidv4} from "@/store/comments-module/treeHelper";

export class CommentNode {
    name: string = '';
    message: string = '';
    date: Date = new Date();
    id: string = uuidv4();
    parentId: string | null= 'root';
    childs: CommentNode[] = []
}

/*
export interface ModifyCommentDto {
    newItem: CommentNode
}
*/

