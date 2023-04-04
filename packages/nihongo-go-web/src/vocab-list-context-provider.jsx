import { useCallback, useState } from "react";
import { VocabListContext } from "./vocab-list-context";

export const VocabListContextProvider = ({
  children,
  vocabs,
  answerMap,
  selectedLanguage,
}) => {
  const updateAnswer = useCallback((vocabId, isCorrect) => {
    const map = answerMap.current;
    if (!map) {
      return;
    }

    map.set(vocabId, isCorrect);

    setContext(context);
  }, []);

  const [context, setContext] = useState({
    vocabs,
    updateAnswer,
    answerMap: answerMap.current,
    selectedLanguage,
  });

  return (
    <VocabListContext.Provider value={context}>
      {children}
    </VocabListContext.Provider>
  );
};
