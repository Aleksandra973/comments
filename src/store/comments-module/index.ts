import { Module } from 'vuex';
import  { RootState }  from '../index';
import state, {CommentsState} from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const commentsModule: Module<CommentsState, RootState> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
};

export default commentsModule;
