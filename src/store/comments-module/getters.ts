import { GetterTree } from 'vuex';
import {RootState} from '../index';
import {CommentsState} from './state';
import {storageService} from "@/services/storageService";
import {CommentNode} from "@/types/common";

const getters: GetterTree<CommentsState, RootState> = {
    getTree(state): CommentNode[] {
        if (state !==undefined && state!==null && state?.comments?.length>0) {
            return state.comments
        }

        let commentsTree: string | null = storageService.getTree()

        if(commentsTree == null || commentsTree?.length == 0){
            return [] as CommentNode[];
        }

        console.log(commentsTree)

        return JSON.parse(commentsTree) as CommentNode[]
    },
};

export default getters;