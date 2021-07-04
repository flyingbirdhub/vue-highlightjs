
<template>
  <pre>
    <code v-html="content"></code>
  </pre>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { FormatUtil } from '@/common/index';

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
    const formatUtil = new FormatUtil({
      language: props.language,
      text: props.text,
      isEscaped: props.isEscaped,
    });
    watch(
      [props.language, props.text, props.isEscaped],
      () => {
        formatUtil.update({
          language: props.language,
          text: props.text,
          isEscaped: props.isEscaped,
        });
        content.value = formatUtil.content;
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

