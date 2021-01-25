import Vuex, {StoreOptions} from 'vuex';
import Vue  from 'vue'
import commentsModule from './comments-module';
import {CommentNode} from "@/types/common";


Vue.use(Vuex)

export interface RootState {
    commentsModule: CommentNode[];
}

const Store  = new Vuex.Store<RootState>({
        modules: {
            commentsModule
        }
    }
)

export default Store
