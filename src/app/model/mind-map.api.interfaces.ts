// Define the structure of the dialogue response expected from the backend
export interface DialogueResponse {
    keywords: string[];
    dialogue: MessagePair[];
  }
  
  export interface MessagePair {
    speaker: string;
    text: string;
  }
  

  // mind-mapper-response.model.ts
export interface MindMapperResponse {
  topic: Topic;
  references: string[];
}

export interface Topic {
  id: string;
  name: string;
  level: number;
  details: string;
  subtopics: Topic[]; // Recursive structure
}
