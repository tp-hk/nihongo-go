import "./vocab-list.css";
import { VocabCard } from "./vocab-card";
import { Progress } from "./progress";
import { useCallback, useState } from "react";
import { VocabListContext } from "./vocab-list-context";

const getDivs = (vocabs) => {
  return vocabs.map((item) => {
    return <VocabCard key={`${item.en}${new Date().getTime()}`} item={item} />;
  });
};

export const VocabList = ({ vocabs, isShowJa }) => {
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const setAnswer = (isCorrect) => {
    let correct = correctAnswerCount + (isCorrect ? 1 : -1);
    if (correct < 0) {
      correct = 0;
    }
    setCorrectAnswerCount(correct);
  };

  return (
    <VocabListContext.Provider
      value={{
        vocabs,
        isShowJa,
        setAnswer,
      }}
    >
      <div>
        <Progress
          correctCount={correctAnswerCount}
          wrongCount={vocabs.length - correctAnswerCount}
        />
        <div className="container">{getDivs(vocabs, isShowJa)}</div>
      </div>
    </VocabListContext.Provider>
  );
};
