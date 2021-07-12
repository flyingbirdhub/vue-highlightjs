import hljs from 'highlight.js';

import { escape } from 'lodash-es';

interface Constructor {
  language?: string;
  text?: string;
  isEscaped?: boolean;
};

export interface UpdateType extends  Constructor {
  text: string;
}

export class FormatUtil {
  private language: string | undefined;
  private text: string | undefined;
  private isEscaped: boolean | undefined;
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
  }: UpdateType) {
    this.language = language;
    this.text = text;
    this.isEscaped = isEscaped;
    this.formated = this.doFormat();
  }

  private doFormat() {
    if (!this.text) {
      return '';
    }
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
