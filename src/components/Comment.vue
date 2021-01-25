<template>
  <div>
    <div>
      <span>{{ comment.message }}:{{ comment.name }}</span>
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
            @addComment="addChildComment($event, child)" :parent-id="comment.id"

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

import moment from "moment";
import {uuidv4} from "@/store/comments-module/treeHelper";


export default Vue.extend({
  name: "Comment",
  props: {
    comment: {
      type: Object as PropType<CommentNode>,
      required: true
    },
    parentId: {
      type: String,
      required: false
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
      this.message = ''
      this.isVisible = !this.isVisible
      this.isDisable = !this.isDisable
    },
    moment(dt: Date) {
      return moment(dt).format()
    },
    addComment() {
      debugger
      var event = new CommentNode();
      event.parentId = this.comment.id
      event.message = this.message
      event.date = new Date()
      event.childs = []
      event.id = uuidv4()

      this.$emit('addComment', event);
      this.message = ''
      this.toggle()
    },
    addChildComment
  },

})

</script>

<style scoped>

</style>