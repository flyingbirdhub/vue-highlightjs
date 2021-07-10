import { FormatUtil } from '@/common/index';
import type { DirectiveBinding } from 'vue';
import { isObject, isString } from 'lodash-es';

type BindingType = {
  language: string,
  text: string,
};

// v-highlightjs.escaped="text"
// v-highlightjs.escaped="{text: '', language: ''}"
const highlightUpdate = (el: HTMLElement, binding: DirectiveBinding<BindingType | string>) => {
  const targets = el.querySelectorAll('code');
  if (targets?.length < 1) {
    return;
  }
  const [target] = targets;
  let isEscaped = true;
  if (binding.modifiers.noEscaped) {
    isEscaped = false;
  }
  let text = null, language = '';
  if (isObject(binding.value)) {
    language = binding.value.language;
    text = binding.value.text;
  } else if (isString(binding.value)) {
    text = binding.value;
  } else {
    text = target.textContent;
  }
  if (!text) {
    return;
  }
  const format = new FormatUtil({
    language,
    text,
    isEscaped,
  });
  target.innerHTML = format.content;
};

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<BindingType | string>) {
    highlightUpdate(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<BindingType | string>) {
    highlightUpdate(el, binding);
  },
};
