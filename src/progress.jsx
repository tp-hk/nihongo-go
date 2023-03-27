import ProgressBar from "react-bootstrap/ProgressBar";
import { useContext, useEffect } from "react";
import { VocabListContext } from "./vocab-list-context";

const getPercentages = (answerMap, totalCount) => {
  const correctCount = [...answerMap.values()].filter(
    (isCorrect) => isCorrect
  ).length;

  const wrongCount = answerMap.size - correctCount;

  const correctPercent =
    totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  const wrongPercent =
    totalCount > 0 ? Math.round((wrongCount / totalCount) * 100) : 0;

  return {
    correctPercent,
    wrongPercent,
  };
};

export const Progress = () => {
  const { vocabs, answerMap } = useContext(VocabListContext);

  const { correctPercent, wrongPercent } = getPercentages(
    answerMap,
    vocabs.length
  );

  return (
    <div>
      <ProgressBar>
        <ProgressBar
          variant="success"
          now={correctPercent}
          label={`${correctPercent}%`}
          key={1}
        />
        <ProgressBar
          variant="danger"
          now={wrongPercent}
          label={`${wrongPercent}%`}
          key={2}
        />
      </ProgressBar>
    </div>
  );
};
