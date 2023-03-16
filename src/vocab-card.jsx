import { useRef, useState, useContext } from "react";
import "./vocab-card.css";
import Card from "react-bootstrap/Card";
import { VocabListContext } from "./vocab-list-context";

export const VocabCard = ({ item }) => {
  const { isShowJa, setAnswer, updateAnswer, answerMap } =
    useContext(VocabListContext);

  const inputRef = useRef(null);
  const [result, setResult] = useState("light");
  const { ja, en } = item;

  const handleKeyPress = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    const val = inputRef.current.value;

    if (!val && result) {
      setResult(null);
      return;
    }

    const expected = isShowJa ? en : ja;
    const isCorrect =
      val.toLowerCase().trim() === expected.toLowerCase().trim();

    updateAnswer(item.id, isCorrect);
  };

  const getBg = () => {
    const isCorrect = answerMap.get(item.id);
    if (isCorrect === undefined) {
      return null;
    }

    return isCorrect ? "success" : "danger";
  };

  return (
    <Card className="card" bg={getBg()}>
      <div>{isShowJa ? ja : en}</div>
      <div>
        <input onKeyPress={handleKeyPress} ref={inputRef} />{" "}
      </div>
    </Card>
  );
};
