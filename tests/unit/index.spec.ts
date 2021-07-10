import VueHighLightjs, { highlightjs } from '@/index';

describe('tests for npm package', () => {
  it('should export Vue Component and Directive Object', () => {
    expect(VueHighLightjs).toMatchInlineSnapshot(`
      Object {
        "name": "VueHighlightjs",
        "props": Object {
          "isEscaped": Object {
            "default": true,
            "type": [Function],
          },
          "language": Object {
            "default": "",
            "type": [Function],
          },
          "text": Object {
            "default": "",
            "type": [Function],
          },
        },
        "render": [Function],
        "setup": [Function],
      }
    `);
    expect(highlightjs.mounted).toBeInstanceOf(Function);
    expect(highlightjs.updated).toBeInstanceOf(Function);
  });
});
