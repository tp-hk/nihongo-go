import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import { VocabListContext } from "./vocab-list-context";

export const VocabListContextProvider = ({
  children,
  selectedLanguage,
  vocabs,
  answerMap,
}) => {
  const updateAnswer = useCallback((vocabId, isCorrect) => {
    const map = answerMap.current;
    if (!map) {
      return;
    }

    map.set(vocabId, isCorrect);

    // Needed just to trigger re-render. To-be-investigated
    const isCorrectCount = [...map.values()].filter(
      (isCorrect) => isCorrect
    ).length;
    setCorrectCount(isCorrectCount);
    setAnsweredCount(map.size);
  }, []);

  const value = {
    vocabs,
    selectedLanguage,
    updateAnswer,
    answerMap: answerMap.current,
  };

  return (
    <VocabListContext.Provider value={value}>
      {children}
    </VocabListContext.Provider>
  );
};
