import type { DirectiveBinding } from 'vue';
import { isObject, isString } from 'lodash-es';
import { formatText } from '@/webworker/main';

type BindingType = {
  language: string,
  text: string,
};

// v-highlightjs.escaped="text"
// v-highlightjs.escaped="{text: '', language: ''}"
const highlightUpdate = async (el: HTMLElement, binding: DirectiveBinding<BindingType | string>) => {
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
  if (!isString(text)) {
    return;
  }
  try {
    target.innerHTML = await formatText({
      language,
      text,
      isEscaped,
    });
  } catch (e) {
    console.log(e);
  }
};

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<BindingType | string>) {
    highlightUpdate(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding<BindingType | string>) {
    highlightUpdate(el, binding);
  },
};
