import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import { VocabListContext } from "./vocab-list-context";

export const VocabListContextProvider = ({
  children,
  isShowJa,
  vocabs,
  answerMap,
}) => {
  const [answerCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  // const answerMap = useRef(new Map());
  const isShowJaRef = useRef(isShowJa);
  const vocabsRef = useRef(vocabs);

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
    isShowJa,
    updateAnswer,
    answerMap: answerMap.current,
  };

  // const value = useMemo(
  //   () => ({
  //     vocabs,
  //     isShowJa,
  //     updateAnswer,
  //     answerMap: answerMap.current,
  //   }),
  //   [answerCount, correctCount]
  // );

  return (
    <VocabListContext.Provider value={value}>
      {children}
    </VocabListContext.Provider>
  );
};
