import { GetterTree } from 'vuex';
import {RootState} from '../index';
import {CommentsState} from './state';
import {storageService} from "@/services/storageService";
import {CommentNode} from "@/types/common";
import {KeyValue} from "@/store/comments-module/treeHelper";

const getters: GetterTree<CommentsState, RootState> = {
    getTree(state): CommentNode[] {

        let stringTree = storageService.getTree()
        let tree: KeyValue[];

        try {
            tree = JSON.parse(stringTree ?? '[]');
        } catch (e){
            tree = [] as KeyValue[];
        }


        return tree
    },
};

export default getters;