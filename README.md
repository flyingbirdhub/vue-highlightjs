## Introduce

Using highlight.js to format code in web worker.

Vue component (based on Vue3) and Vue directive (Vue2 or Vue3) are provided.

## Usage

### Vue directive

```javascript
import { highlightjs } from 'vue-highlightjs-all';

/**
 * for Vue2
 * const app =  createApp();
 * app.directive('highlightjs', highlightjs);
 **/
Vue.directive('highlightjs', highlightjs);

<template>
  <pre v-highlightjs.noEscaped="{language: 'javascript', text: ''}"><code></code></pre>
</template>
```

> Support arguments

* Modifies: noEscaped

* Value: string format means text or an object

  ```javascript
  {
    language: '',
    text: '',
  }
  ```

> if there is no argument, v-highlightjs would get textContent from Code Tag.

### Vue Component

```javascript
import VueHighlightjs from 'vue-highlightjs-all';

<VueHighlightjs :text="" :language="" :isEscaped="true"></VueHighlightjs>
```

> Arguments

* text：optional, string
* language: optional, string
* isEscaped: optional, bool

## Tests

There are some tests in the test directory.