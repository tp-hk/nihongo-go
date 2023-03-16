import "./vocab-list.css";
import { VocabCard } from "./vocab-card";
import { Progress } from "./progress";
import { useMemo, useCallback, useState, useRef } from "react";
import { VocabListContext } from "./vocab-list-context";

const getDivs = (vocabs) => {
  return vocabs.map((item) => {
    return <VocabCard key={item.id} item={item} />;
  });
};

export const VocabList = ({ vocabs, isShowJa }) => {
  // const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const totalCount = vocabs.length;
  const answerMap = useRef(new Map());

  const updateAnswer = useCallback((vocabId, isCorrect) => {
    const map = answerMap.current;
    if (!map) {
      return;
    }

    map.set(vocabId, isCorrect);
    // const correctCount = [...map.values()].filter(
    //   (isCorrect) => isCorrect
    // ).length;
    // setCorrectCount(correctCount);
    setAnsweredCount(map.size);
  }, []);

  const memoValue = useMemo(
    () => ({
      isShowJa,
      updateAnswer,
      answerMap: answerMap.current,
    }),
    [answeredCount, answerMap]
  );

  return (
    <VocabListContext.Provider value={memoValue}>
      <div>
        <Progress />
        <div className="container">{getDivs(vocabs)}</div>
      </div>
    </VocabListContext.Provider>
  );
};
