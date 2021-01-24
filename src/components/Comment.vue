<template>
  <div>
    <div>
      <span>{{ comment.name }}: {{ comment.message }}</span>
    </div>

    <div>
      <button class="btn-secondary" :disabled="isDisable" @click="toggle">Comment</button>
      <div v-if="isVisible">
        <textarea v-model="message"></textarea>
        <button @click="addComment">Send</button>
        <button @click="toggle">Cancel</button>
      </div>
      <div style="margin-left: 30px; border: solid 1px">
        <Comment
            v-for="child in comment.childs"
            :comment="child"
            @addComment="addChildComment($event, child)"

        />
      </div>
    </div>


  </div>

</template>

<script lang="ts">

import {PropType} from "vue";
import {CommentNode} from "@/types/common";
import {addChildComment} from "./composables/commentBase"
import Vue from "vue";


export default Vue.extend({
  name: "Comment",
  props: {
    comment: {
      type: Object as PropType<CommentNode>,
      required: true
    }
  },
  data() {
    return {
      isVisible: false,
      isDisable: false,
      message: ''
    }
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible
      this.isDisable = !this.isDisable
    },
    addComment() {
      this.$emit('addComment', {
        name: "name-" + new Date(),
        message: this.message,
        date: new Date(),
        childs: []
      } as CommentNode);
      this.message = ''
      this.toggle()
    },
    addChildComment
  },

})

</script>

<style scoped>

</style>