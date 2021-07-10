import { mount } from '@vue/test-utils';
import { reactive, h } from 'vue';
import VueHighlightjs from '@/components/vue-highlightjs/index.vue';

describe('tests for VueHighlightjs Component', () => {
  it('mount VueHighlightjs', () => {
    const text = `
        function test() {
            console.log('test highlightjs');
        }`;
    const wrapper = mount(VueHighlightjs, {
      propsData: {
        text,
      },
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<pre>    <code>
              <span class=\\"hljs-keyword\\">function</span> <span class=\\"hljs-title\\">test</span>() {
                  console.log(&amp;#39;test highlightjs&amp;#39;);
              }</code>
        </pre>"
    `);
  });
  it('update VueHighlightjs', (done) => {
    const text = `
        function test() {
            console.log('test highlightjs');
        }`;
    const wrapper = mount({
      data() {
        return {
          text: '',
        };
      },
      render() {
        const { text } = this;
        return h(VueHighlightjs, {
          text,
        });
      },
    });
    wrapper.vm.text = text;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<pre>    <code>
                <span class=\\"hljs-keyword\\">function</span> <span class=\\"hljs-title\\">test</span>() {
                    console.log(&amp;#39;test highlightjs&amp;#39;);
                }</code>
          </pre>"
      `);
      done();
    });
  });
});
