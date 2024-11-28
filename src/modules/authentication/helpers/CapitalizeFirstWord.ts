export const CapitalizeFirstWord = (sentence: string): string => {
  let words = sentence.split(' ');
  let firstWord = words[0].split('');
  const firstLetter = firstWord[0].toUpperCase();

  firstWord[0] = firstLetter;
  words[0] = firstWord.join('');

  return words.join(' ');
};
