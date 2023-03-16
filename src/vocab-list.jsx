import "./vocab-list.css";
import { VocabCard } from "./vocab-card";
import { Progress } from "./progress";
import { VocabListContextProvider } from "./vocab-list-context-provider";

const getDivs = (vocabs) =>
  vocabs.map((item) => <VocabCard key={item.id} item={item} />);

export const VocabList = ({ vocabs, isShowJa }) => {
  return (
    <VocabListContextProvider isShowJa={isShowJa} vocabs={vocabs}>
      <div>
        <Progress />
        <div className="container">{getDivs(vocabs)}</div>
      </div>
    </VocabListContextProvider>
  );
};
