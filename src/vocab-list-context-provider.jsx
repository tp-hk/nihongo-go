import { useMemo, useCallback, useState, useRef } from "react";
import { VocabListContext } from "./vocab-list-context";

export const VocabListContextProvider = ({ children, isShowJa, vocabs }) => {
  const [answerCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const answerMap = useRef(new Map());

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

  const value = useMemo(
    () => ({
      isShowJa,
      updateAnswer,
      answerMap: answerMap.current,
      totalCount: vocabs.length,
    }),
    [answerCount, correctCount]
  );

  return (
    <VocabListContext.Provider value={value}>
      {children}
    </VocabListContext.Provider>
  );
};
