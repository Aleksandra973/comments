<template>
  <div class="container">
    <img class="img-cat" src="../../public/cat.jpg">
    <div>
      <button :disabled="isDisable" @click="toggle" class="btn btn-primary">Comment</button>
      <div v-if="isVisible">
        <textarea v-model="rootNode.message"></textarea>

        <button @click="addRootComment" >Send</button>
        <button @click="toggle">Cancel</button>
      </div>
    </div>
    <Comment
        v-for="comment in commentsTree"
        @addComment="addChildComment($event, comment)"
        @deleteComment="deleteChildComment($event,commentsTree)"
        @saveEditComment="editChildComment($event,commentsTree)"
        :comment="comment" :parent-id="null"/>
  </div>
</template>

<script lang="ts">
import Comment from "./Comment.vue"
import {CommentNode} from "@/types/common";
import Vue  from "vue";

import {addChildComment, deleteChildComment, editChildComment, getRandomName} from "./composables/commentBase"
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
      this.rootNode.name = getRandomName()
      this.rootNode.childs = []
      this.rootNode.id = uuidv4()
      this.rootNode.parentId = null
      this.commentsTree.push(this.rootNode)

      $store.dispatch('commentsModule/addComment', this.rootNode );


      this.toggle()

    },
    deleteChildComment,

    editChildComment,

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