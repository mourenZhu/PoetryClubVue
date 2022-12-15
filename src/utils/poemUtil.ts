import { PoemType } from '@/api/poem';

export function getSentenceList(content: string): string[] {
  const strings = content.split(/([。？；])/g);
  const sentenceList: string[] = [];
  let sentence: string;
  strings.forEach((s) => {
    if (s.length > 1) {
      sentence = s;
    } else {
      sentenceList.push(sentence + s);
    }
  });
  return sentenceList;
}

export function cnPoemType(poemType: PoemType): string {
  if (poemType === 'FIVE_CHARACTER_RHYTHM_POEM') {
    return '五言律诗';
  }
  if (poemType === 'FIVE_CHARACTER_LONG_RHYTHM_POEM') {
    return '五言长律';
  }
  if (poemType === 'SIX_CHARACTER_RHYTHM_POEM') {
    return '六言律诗';
  }
  if (poemType === 'SIX_CHARACTER_LONG_RHYTHM_POEM') {
    return '六言长律';
  }
  if (poemType === 'SEVEN_CHARACTER_RHYTHM_POEM') {
    return '七言律诗';
  }
  if (poemType === 'SEVEN_CHARACTER_LONG_RHYTHM_POEM') {
    return '七言长律';
  }
  if (poemType === 'FIVE_CHARACTER_QUATRAIN') {
    return '七言绝句';
  }
  if (poemType === 'SIX_CHARACTER_QUATRAIN') {
    return '六言绝句';
  }
  if (poemType === 'SEVEN_CHARACTER_QUATRAIN') {
    return '七言绝句';
  }
  if (poemType === 'UNKNOWN') {
    return '其他';
  }
  return '';
}

export default null;
