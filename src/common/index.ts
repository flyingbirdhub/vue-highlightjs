import hljs from 'highlight.js';

import { escape } from 'lodash-es';

type Constructor = {
  language: string;
  text: string;
  isEscaped: boolean;
};

export class FormatUtil {
  private language: string;
  private text: string;
  private isEscaped: boolean;
  private formated: string;

  public constructor({
    language,
    text,
    isEscaped,
  }: Constructor) {
    this.language = language;
    this.text = text;
    this.isEscaped = isEscaped;
    this.formated = this.doFormat();
  }

  get content() {
    return this.formated;
  }

  public update({
    language,
    text,
    isEscaped,
  }: Constructor) {
    this.language = language;
    this.text = text;
    this.isEscaped = isEscaped;
    this.formated = this.doFormat();
  }

  private doFormat() {
    let text = this.text;
    if (this.isEscaped) {
      text = escape(text);
    }
    if (this.language) {
      return hljs.highlight(text, {
        language: this.language,
      }).value;
    }
    return hljs.highlightAuto(text).value;
  }
}
