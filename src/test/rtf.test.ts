import { describe, expect, it } from 'vitest';
import { rtfToText } from '@/lib/rtf';

describe('rtfToText', () => {
  it('keeps text inside formatting groups and splits paragraphs', () => {
    const rtf = String.raw`{\rtf1\ansi\deff0{\fonttbl{\f0 Arial;}}\f0\fs24 {\b Bold title}\par Plain paragraph.\par Second paragraph.\par}`;
    expect(rtfToText(rtf)).toBe('Bold title\nPlain paragraph.\nSecond paragraph.');
  });

  it('decodes hex and unicode escapes', () => {
    expect(rtfToText('{\\rtf1\\ansi caf\\\'e9 \\u8364?5 \\u233?}')).toBe('café €5 é');
  });

  it('skips fonts, colours and metadata but keeps the body', () => {
    const rtf = String.raw`{\rtf1{\fonttbl{\f0 Times;}}{\colortbl;\red255\green0\blue0;}{\info{\title Hidden title}}{\*\generator Word;}Visible text}`;
    expect(rtfToText(rtf)).toBe('Visible text');
  });

  it('handles escaped braces and tabs', () => {
    expect(rtfToText(String.raw`{\rtf1 a\{b\}\tab c}`)).toBe('a{b}\tc');
  });
});
