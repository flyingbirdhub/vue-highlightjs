import { FormatUtil } from '@/common';

describe('format code to colorful', () => {
  const text = `
    function test() {
        console.log('hello');
    }`;
  const language = 'javascript';
  it('new FormatUtil not isEscaped, then get content, should be formatted', () => {
    const util = new FormatUtil({
      text,
      language,
      isEscaped: false,
    });
    expect(util.content).toMatchInlineSnapshot(`
      "
          <span class=\\"hljs-keyword\\">function</span> <span class=\\"hljs-title function_\\">test</span>(<span class=\\"hljs-params\\"></span>) {
              <span class=\\"hljs-variable language_\\">console</span>.<span class=\\"hljs-title function_\\">log</span>(<span class=\\"hljs-string\\">&#x27;hello&#x27;</span>);
          }"
    `);
  });
  it('new FormatUtil isEscaped, then get content, should be formatted', () => {
    const util = new FormatUtil({
      text,
      language,
      isEscaped: true,
    });
    expect(util.content).toMatchInlineSnapshot(`
      "
          <span class=\\"hljs-keyword\\">function</span> <span class=\\"hljs-title function_\\">test</span>(<span class=\\"hljs-params\\"></span>) {
              <span class=\\"hljs-variable language_\\">console</span>.<span class=\\"hljs-title function_\\">log</span>(&amp;#<span class=\\"hljs-number\\">39</span>;hello&amp;#<span class=\\"hljs-number\\">39</span>;);
          }"
    `);
  });
  it('new FormatUtil without language, then get content, should be formatted', () => {
    const util = new FormatUtil({
      text,
      isEscaped: true,
    });
    expect(util.content).toMatchInlineSnapshot(`
      "
          <span class=\\"hljs-keyword\\">function</span> <span class=\\"hljs-title\\">test</span>() {
              console.log(&amp;#39;hello&amp;#39;);
          }"
    `);
  });
  it('new FormatUtil no text, then get content, should get space', () => {
    const util = new FormatUtil({});
    expect(util.content).toMatchInlineSnapshot(`""`);
  });
  it('new FormatUtil update, then get content, should be formatted', () => {
    const util = new FormatUtil({});
    util.update({
      text,
    });
    expect(util.content).toMatchInlineSnapshot(`
      "
          <span class=\\"hljs-keyword\\">function</span> <span class=\\"hljs-title function_\\">test</span>(<span class=\\"hljs-params\\"></span>) {
              <span class=\\"hljs-variable language_\\">console</span>.<span class=\\"hljs-title function_\\">log</span>(<span class=\\"hljs-string\\">&#x27;hello&#x27;</span>);
          }"
    `);
  });
});
