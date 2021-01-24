export interface CommentNode {
    name: string;
    message: string;
    date: Date;
    childs: CommentNode[]
}

export interface ModifyCommentDto {
    root: CommentNode[],
    node: CommentNode,
    newItem: CommentNode
}

