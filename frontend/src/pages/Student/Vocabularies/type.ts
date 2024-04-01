type Data = {
  english: string;
  spanish: string;
  image: string;
  audio: string;
};

type VocabulariesData = [string, Data[]][]; 

export type {
  Data,
  VocabulariesData
};
