import ProgressBar from "react-bootstrap/ProgressBar";

export const Progress = (props) => {
  const { correctCount, wrongCount } = props;
  const total = correctCount + wrongCount;
  const correctPercent =
    total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const wrongPercent = 100 - correctPercent;

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
          key={3}
        />
      </ProgressBar>
    </div>
  );
};
