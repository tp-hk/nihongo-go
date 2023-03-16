import { useState, useEffect } from "react";
import { VocabList } from "./vocab-list";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { vocabs } from "./data";
import "./container.css";

const addIds = (items) =>
  items.map((item, index) => {
    item.id = index;
    return item;
  });

const shuffle = (items) => items.sort(() => 0.5 - Math.random());

export const Container = () => {
  const [langText, setLangText] = useState("EN");
  const [shuffledVocabs, setVocabs] = useState(() => shuffle(addIds(vocabs)));

  const handleSwitchLanguage = () => {
    setLangText(langText === "EN" ? "JA" : "EN");
    handleRestart();
  };

  const handleRestart = () => {
    const shuffled = shuffle(shuffledVocabs);
    // without recreating, child elements don't update
    setVocabs(JSON.parse(JSON.stringify(shuffled)));
  };

  return (
    <div>
      <ButtonGroup>
        <Button onClick={handleSwitchLanguage}>{langText}</Button>
        <Button onClick={handleRestart}>Restart</Button>
      </ButtonGroup>
      <VocabList vocabs={shuffledVocabs} isShowJa={langText} />
    </div>
  );
};
