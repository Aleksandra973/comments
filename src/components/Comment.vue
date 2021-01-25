<template>
  <div>
    <div>
      <span>{{ comment.message }}:{{ comment.name }}</span>
      <button @click="editComment">Edit</button>
      <button @click="deleteComment">Delete</button>
    </div>

    <div>
      <button class="btn-secondary" :disabled="isDisable" @click="toggle">Comment</button>
      <div v-if="editIsVisible">
        <textarea v-model="editMessage"></textarea>
        <button @click="saveComment">Save</button>
        <button @click="editToggle">Cancel</button>
      </div>
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
            @deleteComment="deleteChildComment"
            @saveEditComment="editChildComment"
            :parent-id="comment.id"

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
import $store from "@/store";


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
      message: '',
      editMessage: '',
      editIsVisible: false
    }
  },
  methods: {
    saveComment() {
      this.$emit('saveEditComment', {id: this.comment.id, message: this.editMessage})
      this.editToggle()
    },
    editToggle() {
      this.editIsVisible = !this.editIsVisible
      this.editMessage=this.comment.message
    },
    toggle():void {
      this.message = ''
      this.isVisible = !this.isVisible
      this.isDisable = !this.isDisable
    },
    moment(dt: Date) {
      return moment(dt).format()
    },
    addComment():void {
      let event = new CommentNode();
      event.parentId = this.comment.id
      event.message = this.message
      event.date = new Date()
      event.childs = []
      event.id = uuidv4()
      console.log(event)
      this.$emit('addComment', event);
      this.message = ''
      this.toggle()
    },
    addChildComment,
    deleteComment(): void {

      this.$emit('deleteComment', this.comment)
    },
    deleteChildComment(e): void {
      let index = this.comment.childs.indexOf(e)
      this.comment.childs.splice(index,1)
      $store.dispatch('commentsModule/deleteComment', e.id);
    },
    editComment(): void {
      this.editToggle()
    },
    editChildComment(e) {
      let item = this.comment.childs.filter(i => i.id===e.id );
      item[0].message = e.message
      $store.dispatch('commentsModule/editComment', e)
    },
  },

})

</script>

<style scoped>

</style>