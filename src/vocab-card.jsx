import { useRef, useState, useContext } from "react";
import "./vocab-card.css";
import Card from "react-bootstrap/Card";
import { VocabListContext } from "./vocab-list-context";

const Hint = ({ text }) => <span className="hint">{text}</span>;

export const VocabCard = ({ item }) => {
  const { isShowJa, updateAnswer, answerMap } = useContext(VocabListContext);
  const [isHintVisible, setIsHintVisible] = useState(false);

  const inputRef = useRef(null);
  const { ja, en } = item;

  const handleKeyPress = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    if (!inputRef.current) {
      return;
    }

    const expected = isShowJa ? en : ja;
    const isCorrect =
      inputRef.current.toLowerCase().trim() === expected.toLowerCase().trim();

    updateAnswer(item.id, isCorrect);
    if (!isCorrect) {
      setIsHintVisible(true);
      setTimeout(() => setIsHintVisible(false), 1000);
    }
  };

  const getBg = () => {
    const isCorrect = answerMap.get(item.id);
    return isCorrect === undefined ? null : isCorrect ? "success" : "danger";
  };

  return (
    <Card className="card" bg={getBg()}>
      <div>
        <div>
          <span>{isShowJa ? ja : en}</span>
          {isHintVisible && <Hint text={isShowJa ? en : ja} />}
        </div>
      </div>
      <div>
        <input
          ref={inputRef}
          onKeyPress={handleKeyPress}
          onChange={(e) => (inputRef.current = e.target.value)}
        />
      </div>
    </Card>
  );
};
