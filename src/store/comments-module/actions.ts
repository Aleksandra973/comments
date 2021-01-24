import { ActionTree } from 'vuex';
import { RootState } from '../index';
import {CommentsState,} from './state';
import { ModifyCommentDto} from "@/types/common";

const actions: ActionTree<CommentsState, RootState> = {
    addComment ({commit}, model : ModifyCommentDto) {
        if(model.node.childs)
        {
            model.node.childs = []
        }

        model.node.childs.push(model.newItem);

        commit('setCommentsTree', model.root);
    }
};

export default actions;

