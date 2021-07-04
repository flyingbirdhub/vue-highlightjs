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
  let isEscaped = true;
  if (binding.modifiers.noEscaped) {
    isEscaped = false;
  }
  let text = '', language = '';
  if (isObject(binding.value)) {
    language = binding.value.language;
    text = binding.value.text;
  } else if (isString(binding.value)) {
    text = binding.value;
  } else {
    text = el.innerText;
  }
  const format = new FormatUtil({
    language,
    text,
    isEscaped,
  });
  const targets = el.querySelectorAll('code');
  if (targets?.length < 1) {
    return;
  }
  const [target] = targets;
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
