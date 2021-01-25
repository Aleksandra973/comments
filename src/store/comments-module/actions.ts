import {ActionTree} from 'vuex';
import {RootState} from '../index';
import {CommentsState,} from './state';
import {CommentNode} from "@/types/common";
import {KeyValue, TreeHelper} from "@/store/comments-module/treeHelper";
import {storageService} from "@/services/storageService";

const actions: ActionTree<CommentsState, RootState> = {
    addComment({commit}, node: CommentNode): void {

        let tree = storageService.getTree()
        /* let tree: CommentNode[];

         try {
               tree = JSON.parse(stringTree ?? '[]');
         } catch (e){
             tree = [] as CommentNode[];
         }

         /!*let kv = new KeyValue();
         kv.key = `${node.parentId}/${node.id}`;
         kv.value = node*!/
 */
        tree.push(node)

        storageService.saveTree(JSON.stringify(tree))
    },
    deleteComment({commit}, id: string): void {
        let tree = storageService.getTree()
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].id === id) {
                tree.splice(i, 1)
            }
        }

        storageService.saveTree(JSON.stringify(tree))
    },
    editComment({commit}, e: any): void {
        let tree = storageService.getTree()
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].id === e.id) {
                tree[i].message = e.message
            }
        }
        storageService.saveTree(JSON.stringify(tree))
    }
};

export default actions;

