import { h, resolveDirective, withDirectives } from 'vue';
import flushPromises from 'flush-promises';
import { mount } from '@vue/test-utils';
import directive from '@/directive';

describe('tests for vue highlightjs directive', () => {
  const text = `
    function test() {
        console.log('hello, highlightjs!');
    }`;
  it('no code tag, innerHTML is not changed', async () => {
    const wrapper = mount({
      directives: {
        highlightjs: directive,
      },
      render() {
        const highlightjs = resolveDirective('highlightjs');
        return withDirectives(h('pre', 'no code tag'), [[highlightjs!]]);
      },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchInlineSnapshot(`"<pre>no code tag</pre>"`);
  });
  it('code tag exists, innerHTML is changed', async () => {
    const wrapper = mount({
      directives: {
        highlightjs: directive,
      },
      render() {
        const highlightjs = resolveDirective('highlightjs');
        return withDirectives(h('pre', [h('code', {}, text)]), [[highlightjs!]]);
      },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<pre><code>
          <span class=\\"hljs-keyword\\">function</span> <span class=\\"hljs-title\\">test</span>() {
              console.log(&amp;#39;hello, highlightjs!&amp;#39;);
          }</code></pre>"
    `);
  });
  it('code tag exists, bind value is Object', async () => {
    const wrapper = mount({
      directives: {
        highlightjs: directive,
      },
      render() {
        const highlightjs = resolveDirective('highlightjs');
        return withDirectives(h('pre', [h('code', {}, text)]), [
          [
            highlightjs!,
            {
              language: 'javascript',
              text,
            },
            '',
            {
              noEscaped: true,
            },
          ],
        ]);
      },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<pre><code>
          <span class=\\"hljs-keyword\\">function</span> <span class=\\"hljs-title function_\\">test</span>(<span class=\\"hljs-params\\"></span>) {
              <span class=\\"hljs-variable language_\\">console</span>.<span class=\\"hljs-title function_\\">log</span>(<span class=\\"hljs-string\\">'hello, highlightjs!'</span>);
          }</code></pre>"
    `);
  });
  it('code tag exists, bind value is Object, but without text, should not convert', async () => {
    const wrapper = mount({
      directives: {
        highlightjs: directive,
      },
      render() {
        const highlightjs = resolveDirective('highlightjs');
        return withDirectives(h('pre', [h('code', {}, text)]), [
          [
            highlightjs!,
            {
              language: 'javascript',
            },
            '',
            {
              noEscaped: true,
            },
          ],
        ]);
      },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<pre><code>
          function test() {
              console.log('hello, highlightjs!');
          }</code></pre>"
    `);
  });
  it('code tag exists, bind value is string', async () => {
    const wrapper = mount({
      directives: {
        highlightjs: directive,
      },
      render() {
        const highlightjs = resolveDirective('highlightjs');
        return withDirectives(h('pre', [h('code', {}, text)]), [
          [
            highlightjs!,
            text,
            '',
            {
              noEscaped: true,
            },
          ],
        ]);
      },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<pre><code>
          <span class=\\"hljs-keyword\\">function</span> <span class=\\"hljs-title function_\\">test</span>(<span class=\\"hljs-params\\"></span>) {
              <span class=\\"hljs-variable language_\\">console</span>.<span class=\\"hljs-title function_\\">log</span>(<span class=\\"hljs-string\\">'hello, highlightjs!'</span>);
          }</code></pre>"
    `);
  });
  it('code tag exists, update value', async () => {
    const wrapper = mount({
      data() {
        return {
          value: '',
        };
      },
      directives: {
        highlightjs: directive,
      },
      render() {
        const highlightjs = resolveDirective('highlightjs');
        const { value } = this;
        return withDirectives(h('pre', [h('code', {})]), [
          [
            highlightjs!,
            value,
            '',
            {
              noEscaped: true,
            },
          ],
        ]);
      },
    });
    await flushPromises();
    expect(wrapper.html()).toMatchInlineSnapshot(`"<pre><code></code></pre>"`);
    wrapper.vm.value = text;
    await flushPromises();
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<pre><code>
          <span class=\\"hljs-keyword\\">function</span> <span class=\\"hljs-title function_\\">test</span>(<span class=\\"hljs-params\\"></span>) {
              <span class=\\"hljs-variable language_\\">console</span>.<span class=\\"hljs-title function_\\">log</span>(<span class=\\"hljs-string\\">'hello, highlightjs!'</span>);
          }</code></pre>"
    `);
  });
});
