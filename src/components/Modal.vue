<template>
  <div ref="modalElement" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div v-show="!hideHeader" class="modal-header">
          <slot name="header">
            <h5 class="modal-title">{{ title }}</h5>
            <button v-show="!hideTopCloseButton" type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @overview Componente usando la API de Composición.
 */
import { Modal } from 'bootstrap';
import { onMounted, ref, watch, withDefaults } from 'vue';

let modal: Modal;

/**
 * Podrías decir que la declaración de la interfaz se puede mover a un archivo para que sea más limpio, tienes razón,
 * pero actualmente Vue no lo soporta, pero quizá una version posterior lo haga.
 *
 * @see https://vuejs.org/guide/typescript/composition-api.html#syntax-limitations
 * @see https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
 */
type TProps = {
  modelValue: boolean;
  title?: string;
  backdropStatic?: boolean;
  keyboard?: boolean;
  hideHeader?: boolean;
  hideTopCloseButton?: boolean;
}

/**
 * @see https://vuejs.org/guide/typescript/composition-api.html#props-default-values
 */
const props = withDefaults(defineProps<TProps>(), { title: '' });

/**
 * @see https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits
 */
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
}>();

/**
 * En la API de opciones para acceder a un elemento del DOM usamos this.$refs.<elemento>, para hacer lo mismo en la
 * API de Composición el valor de ref y el nombre de la variable deben ser iguales, ya que Vue se encargara de resolver
 * el valor.
 *
 * @see https://vuejs.org/guide/essentials/template-refs.html#accessing-the-refs
 * @see https://vuejs.org/guide/typescript/composition-api.html#typing-template-refs
 *
 * Para poder determinar el tipo de dato se puede utilizar el tipo Ref<T> o sobreescribiendo el tipo por defecto
 * como se está haciendo en este caso.
 *
 * @see https://vuejs.org/guide/typescript/composition-api.html#typing-ref
 */
const modalElement = ref<HTMLElement | null>(null);

onMounted(() => {
  modal = new Modal(modalElement.value as HTMLElement, {
    backdrop: props.backdropStatic ? 'static' : true,
    keyboard: props.keyboard,
  });
  modalElement.value?.addEventListener('hide.bs.modal', () => emits('update:modelValue', false));
  modalElement.value?.addEventListener('show.bs.modal', () => emits('update:modelValue', true));
});

watch(() => props.modelValue, (newValue: boolean) => newValue ? modal.show() : modal.hide());
</script>
