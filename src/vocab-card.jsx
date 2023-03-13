import { useRef, useState, useContext } from "react";
import "./vocab-card.css";
import Card from "react-bootstrap/Card";
import { VocabListContext } from "./vocab-list-context";

export const VocabCard = ({ item }) => {
  const { isShowJa, setAnswer } = useContext(VocabListContext);

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
    setResult(isCorrect ? "success" : "danger");

    setAnswer(isCorrect);
  };

  return (
    <Card className="card" bg={result}>
      <div>{isShowJa ? ja : en}</div>
      <div>
        <input onKeyPress={handleKeyPress} ref={inputRef} />{" "}
      </div>
    </Card>
  );
};
