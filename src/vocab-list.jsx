import "./vocab-list.css";
import { VocabCard } from "./vocab-card";
import { Progress } from "./progress";
import { VocabListContextProvider } from "./vocab-list-context-provider";
import { useRef, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { vocabs } from "./data";

const addIds = (items) =>
  items.map((item, index) => {
    item.id = index;
    return item;
  });

const shuffle = (items) => items.sort(() => 0.5 - Math.random());

const getCards = (vocabs) => {
  const time = new Date().getTime();
  return vocabs.map((item) => (
    <VocabCard key={`${item.id}-${time}`} item={item} />
  ));
};

export const VocabList = () => {
  const [langText, setLangText] = useState("EN");
  const [shuffledVocabs, setVocabs] = useState(() => shuffle(addIds(vocabs)));
  const answerMap = useRef(new Map());

  const handleSwitchLanguage = () => {
    setLangText(langText === "EN" ? "JA" : "EN");
    handleRestart();
  };

  const handleRestart = () => {
    const shuffled = shuffle(shuffledVocabs);
    // without recreating, child elements don't update
    setVocabs(JSON.parse(JSON.stringify(shuffled)));
    answerMap.current = new Map();
  };

  return (
    <>
      <ButtonGroup>
        <Button onClick={handleSwitchLanguage}>{langText}</Button>
        <Button onClick={handleRestart}>Restart</Button>
      </ButtonGroup>
      <VocabListContextProvider
        isShowJa={langText !== "JA"}
        vocabs={shuffledVocabs}
        answerMap={answerMap}
      >
        <Progress />
        <div className="container">{getCards(shuffledVocabs)}</div>
      </VocabListContextProvider>
    </>
  );
};
