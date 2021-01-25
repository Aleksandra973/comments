<template>
  <div>
    <div class="comment-card">
      <span class="comment-card__title">{{ comment.name }}</span>
      <span class="comment-card__date"> {{ moment(comment.data) }}</span>

      <p>{{comment.message}}</p>
        <button @click="editComment" class="btn btn-light">Edit</button>
        <button @click="deleteComment" class="btn btn-light">Delete</button>
        <button class="btn btn-primary comment-card__btn" :disabled="isDisable" @click="toggle">Comment</button>

      <div v-if="editIsVisible">
        <textarea class="form-control comment-card__textarea" v-model="editMessage"></textarea>
        <button @click="saveComment" class="btn btn-outline-primary">Save</button>
        <button @click="editToggle" class="btn btn-outline-secondary">Cancel</button>
      </div>
      <div v-if="isVisible">
        <textarea class="form-control" v-model="message"></textarea>
        <button @click="addComment" class="btn btn-outline-primary">Send</button>
        <button @click="toggle" class="btn btn-outline-secondary">Cancel</button>
      </div>
    </div>

    <div class="comment-tab">
      <Comment
          v-for="child in comment.childs"
          :comment="child"
          @addComment="addChildComment($event, child)"
          @deleteComment="deleteChildComment($event, comment.childs)"
          @saveEditComment="editChildComment($event, comment.childs)"
          :parent-id="comment.id"

      />
    </div>


  </div>

</template>

<script lang="ts">

import {PropType} from "vue";
import {CommentNode} from "@/types/common";
import {addChildComment, deleteChildComment, editChildComment, getRandomName} from "./composables/commentBase"
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
      this.editMessage = this.comment.message
    },
    toggle(): void {
      this.message = ''
      this.isVisible = !this.isVisible
      this.isDisable = !this.isDisable
    },

    moment(dt: Date) {
      return moment(dt).format('MM.DD.YY: HH:mm')
    },

    addComment(): void {
      let event = new CommentNode();
      event.name = getRandomName()
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

    deleteChildComment,

    editChildComment,

    deleteComment(): void {
      this.$emit('deleteComment', this.comment)
    },

    editComment(): void {
      this.editToggle()
    },

  }

})

</script>

<style scoped>

</style>