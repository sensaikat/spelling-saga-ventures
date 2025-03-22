
export const useSpeech = () => {
  const speakWord = (text: string, languageId: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageId;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  return { speakWord };
};
