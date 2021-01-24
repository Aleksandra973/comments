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
        :comment="comment"/>
  </div>
</template>

<script lang="ts">
import Comment from "./Comment.vue"
import {CommentNode} from "@/types/common";
import Vue  from "vue";
import {addChildComment} from "./composables/commentBase"

export default Vue.extend({
  name: "CommentsTree",
  data() {
    return {
      commentsTree: [] as CommentNode[],
      isVisible: false,
      isDisable: false,
      rootNode: {} as CommentNode
    }

  },
  components: {
    Comment
  },
  methods: {
    addRootComment () {
      this.rootNode.date = new Date()
      this.rootNode.name = `name-${new Date()}`
      this.rootNode.childs = []
      this.commentsTree.push(this.rootNode)
      this.toggle()
      this.rootNode.message = ''
    },
    addChildComment,
    toggle() {
      this.isVisible = !this.isVisible
      this.isDisable = !this.isDisable
    },
  }

})
</script>

<style scoped>

</style>