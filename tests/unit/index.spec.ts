import Vue from 'vue';
import Component, { highlightjs } from '@/index';

describe('Vue highlightjs', () => {
  it('Component shoule be a Vue component', () => {
    console.log(Component);
    expect(Component).toBeInstanceOf(Vue);
  });
});
