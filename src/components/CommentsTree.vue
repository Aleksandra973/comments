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
        @deleteComment="deleteChildComment"
        @saveEditComment="editChildComment"
        :comment="comment" :parent-id="null"/>
  </div>
</template>

<script lang="ts">
import Comment from "./Comment.vue"
import {CommentNode} from "@/types/common";
import Vue  from "vue";

import {addChildComment} from "./composables/commentBase"
import $store from "../store"
import {uuidv4} from "@/store/comments-module/treeHelper";

export default Vue.extend({
  name: "CommentsTree",
  data() {
    return {
      commentsTree: [] as CommentNode[],
      isVisible: false,
      isDisable: false,
      rootNode: new CommentNode(),
    }

  },
  components: {
    Comment
  },

  mounted() {
    this.commentsTree = $store.getters['commentsModule/getTree']
  },

  methods: {

    addRootComment (): void {
      this.rootNode.date = new Date()
      this.rootNode.name = `name-${uuidv4().substring(0,3)}`
      this.rootNode.childs = []
      this.rootNode.id = uuidv4()
      this.rootNode.parentId = null
      this.commentsTree.push(this.rootNode)

      $store.dispatch('commentsModule/addComment', this.rootNode );


      this.toggle()

    },
    deleteChildComment(e) {
      let index = this.commentsTree.indexOf(e)
      this.commentsTree.splice(index,1)
      $store.dispatch('commentsModule/deleteComment', e.id);

    },
    editChildComment(e) {
      $store.dispatch('commentsModule/editComment', e);
      let item = this.commentsTree.filter(i => i.id===e.id );
      item[0].message = e.message
    },
    addChildComment,
    toggle(): void {
      this.rootNode = {  } as CommentNode;
      this.isVisible = !this.isVisible
      this.isDisable = !this.isDisable
    },
  },


})
</script>

<style scoped>

</style>