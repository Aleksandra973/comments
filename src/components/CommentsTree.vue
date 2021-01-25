<template>
  <div class="container">
    <img class="" src="../../public/cat.jpg">
    <div>
      <button :disabled="isDisable" @click="toggle">Comment</button>
      <div v-if="isVisible">
        <textarea v-model="rootNode.message"></textarea>
        <button @click="addRootComment" >Send</button>
        <button @click="toggle">Cancel</button>
      </div>
    </div>
    <Comment
        v-for="comment in commentsTree"
        @addComment="addChildComment($event, comment)"
        :comment="comment" :parent-id="root"/>
  </div>
</template>

<script lang="ts">
import Comment from "./Comment.vue"
import {CommentNode} from "@/types/common";
import Vue  from "vue";
//import { mapGetters, mapActions} from 'vuex';
import {addChildComment} from "./composables/commentBase"
import $store from "../store"
import {TreeHelper, uuidv4} from "@/store/comments-module/treeHelper";

export default Vue.extend({
  name: "CommentsTree",
  data() {
    return {
      commentsTree: [] as CommentNode[],
      isVisible: false,
      isDisable: false,
      rootNode: new CommentNode(),
      root: 'root'
    }

  },
  components: {
    Comment
  },
  methods: {
   // ...mapActions('comments-module', { addTestComment: 'addComment'}),
    addRootComment (): void {
      this.rootNode.date = new Date()
      this.rootNode.name = `name-${uuidv4().substring(0,3)}`
      this.rootNode.childs = []
      this.rootNode.id = uuidv4()
      this.rootNode.parentId = 'root'
      this.commentsTree.push(this.rootNode)

      debugger

      $store.dispatch('commentsModule/addComment', {
        newItem: this.rootNode
      });


      //var th = new TreeHelper();
      //var res=  th.convertToFlat(this.commentsTree)
     // console.log(this.commentsTree)
      //console.log(res)
      /*this.addTestComment({
        node: this.commentsTree,
        newItem: this.rootNode
      });*/

      this.toggle()

    },
    addChildComment,
    toggle(): void {
      this.rootNode = {  } as CommentNode;
      this.isVisible = !this.isVisible
      this.isDisable = !this.isDisable
    },
  },
    /*computed: {
    ...mapGetters([
    'getTree'
  ]),
    } */

})
</script>

<style scoped>

</style>