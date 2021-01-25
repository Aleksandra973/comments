import { GetterTree } from 'vuex';
import {RootState} from '../index';
import {CommentsState} from './state';
import {storageService} from "@/services/storageService";
import {CommentNode} from "@/types/common";
import {KeyValue, TreeHelper} from "@/store/comments-module/treeHelper";
import { createTreeFromFlatArray } from "@lukeaus/plain-tree"

const getters: GetterTree<CommentsState, RootState> = {
    getTree(): CommentNode[] {

        let tree = storageService.getTree()
        let fakeRootNode = {} as any

        for (const commentNode of tree) {
            if (commentNode.parentId === null) {
                commentNode.parentId = 'root'
            }
        }

        fakeRootNode.parentId = null
        fakeRootNode.childs = []
        fakeRootNode.id = 'root'

        tree.push(fakeRootNode)

        let resultTree = createTreeFromFlatArray(tree).root.children

        for (const resultTreeElement of resultTree) {
            TreeHelper.converter(resultTreeElement)
            TreeHelper.bfs(resultTreeElement)
        }
        return resultTree


    },


};

export default getters;