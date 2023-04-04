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

const languageMap = [
  {
    next: "JA",
    curr: "EN",
  },
  {
    next: "EN",
    curr: "JA",
  },
  {
    next: "KA",
    curr: "JA",
  },
];

const vocabSource = addIds(vocabs);

export const VocabList = () => {
  const [nextLang, setNextLang] = useState("EN");
  const [shuffledVocabs, setVocabs] = useState(() => shuffle(vocabSource));
  const answerMap = useRef(new Map());

  const handleSwitchLanguage = () => {
    let next = "EN";
    if (nextLang === "EN") {
      next = "JA";
    } else if (nextLang === "JA") {
      next = "KA";
    } else {
      next = "EN";
    }
    setNextLang(next);
    handleRestart();
  };

  const handleRestart = () => {
    let shuffled = shuffle(shuffledVocabs);
    if (nextLang === "KA") {
      shuffled = vocabSource.filter((vocab) => !!vocab.ka);
    }
    // without recreating, child elements don't update
    setVocabs(JSON.parse(JSON.stringify(shuffled)));
    answerMap.current = new Map();
  };

  return (
    <>
      <ButtonGroup>
        <Button onClick={handleSwitchLanguage}>{nextLang}</Button>
        <Button onClick={handleRestart}>Restart</Button>
      </ButtonGroup>
      <VocabListContextProvider
        vocabs={shuffledVocabs}
        answerMap={answerMap}
        selectedLanguage={nextLang}
      >
        <Progress />
        <div className="container">{getCards(shuffledVocabs)}</div>
      </VocabListContextProvider>
    </>
  );
};
