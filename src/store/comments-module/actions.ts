import { ActionTree } from 'vuex';
import { RootState } from '../index';
import {CommentsState,} from './state';
import {CommentNode, ModifyCommentDto} from "@/types/common";
import {KeyValue, TreeHelper} from "@/store/comments-module/treeHelper";
import {storageService} from "@/services/storageService";

const actions: ActionTree<CommentsState, RootState> = {
    addComment ({commit}, node: ModifyCommentDto): void {

        //debugger

        let stringTree = storageService.getTree()
        let tree: KeyValue[];

        try {
              tree = JSON.parse(stringTree ?? '[]');
        } catch (e){
            tree = [] as KeyValue[];
        }

        let kv = new KeyValue();
        kv.key = `${node.newItem.parentId}/${node.newItem.id}`;
        kv.value = node.newItem

        tree.push(kv)

        storageService.saveTree(JSON.stringify(tree))
    }
};

export default actions;

