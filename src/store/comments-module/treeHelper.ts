import {CommentNode} from "@/types/common";
import {storageService} from "@/services/storageService";

export class KeyValue {
    key: string = '';
    value: any
}

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export class TreeHelper {
    flatStructure: KeyValue[] = []

    convertToFlat(tree: CommentNode[]) {
        this.rec(tree, uuidv4())
        console.log(this.flatStructure)
        return this.flatStructure;
    }

    rec(subTree: CommentNode[], parentId: string) {
        //debugger
        for (const commentNode of subTree) {
            if (typeof commentNode == 'object' && !Array.isArray(commentNode)) {
                let cn = commentNode as any;
                cn.id = uuidv4() + '';
                cn.parentId = parentId + '';
                var copy = {...cn};
                copy.childs = []
                this.flatStructure.push(copy)
                for (let p in cn) {
                    if (Array.isArray(cn[p])) this.rec(cn[p], `${cn.parentId}/${cn.id}`)
                }
            }
        }
    }

    convertToTree(flatTree:KeyValue[]): CommentNode[]{
        let res: CommentNode[] = [] as CommentNode[];

        let rootItems = flatTree.filter(x=>x.key.length === 41)

        for (const rootItem of rootItems) {



        }



        return res;
    }

    static converter(resultTree: any) {
        resultTree.parentId = resultTree.parent
        resultTree.id = resultTree.id
        resultTree.childs = resultTree.children
        resultTree.name = resultTree.data.name
        resultTree.date = resultTree.data.date
        resultTree.message = resultTree.data.message
        delete  resultTree.data
    }

    static bfs(subTree: any) {
        let queue = []
        queue.push(...subTree.childs)

        while (queue.length>0) {
            let item = queue.shift();
            this.converter(item)
            if (item.childs.length>0) {
                queue.push(...item.childs)
            }
        }
    }
}

