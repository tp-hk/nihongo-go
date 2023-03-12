import './question-list.css';
import { Question } from './question';

const getDivs = (vocabs, isShowJa) => {
  return vocabs.map((item) => {
    return (
      <Question
        key={`${item.en}${new Date().getTime()}`}
        item={item}
        isShowJa={isShowJa}
      />
    );
  });
};

export const QuestionList = ({ vocabs, isShowJa }) => {
  return <div className="container">{getDivs(vocabs, isShowJa)}</div>;
};
