import { useRef, useState } from 'react';
import './question.css';
import Card from 'react-bootstrap/Card';

export const Question = ({ item, isShowJa }) => {
  const inputRef = useRef(null);
  const [result, setResult] = useState('light');
  const { ja, en } = item;

  const handleKeyPress = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    const val = inputRef.current.value;

    if (!val && result) {
      setResult(null);
      return;
    }

    const expected = isShowJa ? en : ja;
    setResult(
      val.toLowerCase().trim() === expected.toLowerCase().trim()
        ? 'success'
        : 'danger'
    );
  };

  return (
    <Card className="question" bg={result}>
      <div>{isShowJa ? ja : en}</div>
      <div>
        <input onKeyPress={handleKeyPress} ref={inputRef} />{' '}
      </div>
    </Card>
  );
};
