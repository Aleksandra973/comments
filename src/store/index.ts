import Vuex, {StoreOptions} from 'vuex';
//import store from '@/store'
import Vue  from 'vue'
import commentsModule from './comments-module';
import {CommentNode} from "@/types/common";

//import libraryModule from './module-example'
/*import currentLibraryModule from './current-library'
import librariesListModule from './libraries-list'
import {CurrentLibrary, Library} from "src/types/service";*/
Vue.use(Vuex)

export interface RootState {
    commentsModule: CommentNode[];
}

/*const store: StoreOptions<RootState> = {

    modules: {
        commentsModule
    },

};*/

//export default new Vuex.Store<RootState>(store);

const Store  = new Vuex.Store<RootState>({
        modules: {
            commentsModule
        }
    }
)

export default Store
/*export default store(function ({ Vue }) {
    Vue.use(Vuex);

    const Store = new Vuex.Store<StateInterface>({
        modules: {
            currentLibraryModule,
            librariesListModule
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: !!process.env.DEBUGGING
    });

    return Store;
});*/