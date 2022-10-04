<template>
  <div id="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div v-show="!hideHeader" class="modal-header">
          <slot name="header" :hide="hide">
            <h5 class="modal-title">{{ title }}</h5>
            <button v-show="!hideTopCloseButton" type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer" :hide="hide">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Modal } from 'bootstrap';

export default defineComponent({
  name: 'Modal',
  props: {
    modelValue: {
      type: Boolean,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    backdropStatic: {
      type: Boolean,
      required: false,
      default: false,
    },
    keyboard: {
      type: Boolean,
      required: false,
      default: true,
    },
    hideHeader: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideTopCloseButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      modal: null as Modal | null,
    };
  },
  watch: {
    modelValue(value) {
      if (value) this.show();
    },
  },
  mounted() {
    new Promise((resolve, reject) => {
      try {
        const modal = new Modal('#modal', {
          backdrop: this.backdropStatic ? 'static' : true,
          keyboard: this.keyboard,
        });
        resolve(modal);
      } catch (e) {
        reject(e);
      }
    })
      .then(modal => {
        this.modal = modal as Modal;
        this._bindBootstrapEvents();
      })
      .catch(e => console.error(e));
  },
  methods: {
    _bindBootstrapEvents() {
      const modal = document.getElementById('modal');
      modal?.addEventListener('hide.bs.modal', () => this.emitUpdateEvent(false));
      modal?.addEventListener('show.bs.modal', () => this.emitUpdateEvent(true));
    },
    show() {
      this.modal?.show();
    },
    hide() {
      this.modal?.hide();
    },
    emitUpdateEvent(value: boolean) {
      this.$emit('update:modelValue', value);
    },
  },
});
</script>
