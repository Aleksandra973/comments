import {CommentNode} from "@/types/common";

export class  storageService {
    private static keyName: string = 'commentsTree'

    public static getTree(): CommentNode[] {
       let  stringTree =  localStorage.getItem(this.keyName)
        let tree: CommentNode[];

        try {
            tree = JSON.parse(stringTree ?? '[]');
        } catch (e){
            tree = [] as CommentNode[];
        }
        return tree
    }
    public static saveTree(value: string) {
        localStorage.setItem(this.keyName, value)
    }

}
