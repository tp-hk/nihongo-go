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

const vocabSource = addIds(vocabs);

export const VocabList = () => {
  const languages = ["EN", "JA", "KA"];
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [nextLang, setNextLang] = useState(languages[1]);
  const [shuffledVocabs, setVocabs] = useState(() => shuffle(vocabSource));
  const answerMap = useRef(new Map());

  const getNextLanguage = (lang) => {
    const index = languages.indexOf(lang);
    if (index === languages.length - 1) {
      return languages[0];
    }
    return languages[index + 1];
  };

  const handleSwitchLanguage = () => {
    const next = getNextLanguage(nextLang);
    const selected = getNextLanguage(selectedLang);

    // console.log(`nextLang: ${next}; selectedLang ${selected}`);

    handleRestart(selected);

    setNextLang(next);
    setSelectedLang(selected);
  };

  const handleRestart = (selected) => {
    let shuffled = shuffle(vocabSource);
    if (selected === "KA") {
      shuffled = shuffle(vocabSource.filter((vocab) => !!vocab.ka));
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
        selectedLanguage={selectedLang}
      >
        <Progress />
        <div className="container">{getCards(shuffledVocabs)}</div>
      </VocabListContextProvider>
    </>
  );
};
