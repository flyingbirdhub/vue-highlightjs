
<template>
  <pre>
    <code v-html="content"></code>
  </pre>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { formatText } from '@/webworker/main';

export default defineComponent({
  name: 'VueHighlightjs',
  props: {
    language: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    isEscaped: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const content = ref('');
    watch(
      () => [props.language, props.text, props.isEscaped],
      async () => {
        try {
            content.value = await formatText({
            language: props.language,
            text: props.text,
            isEscaped: props.isEscaped,
          });
        } catch(e) {
          console.log(e);
        }
      },
      {
        immediate: true,
      }
    );
    return {
      content,
    };
  },
});
</script>

