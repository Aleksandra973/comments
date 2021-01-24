import { MutationTree } from 'vuex';
import {CommentsState} from './state';
import {CommentNode} from "@/types/common";

const mutation: MutationTree<CommentsState> = {
    setCommentsTree: (state, commentsTree:CommentNode[])=> {
        state.comments = commentsTree
    }
};

export default mutation;
