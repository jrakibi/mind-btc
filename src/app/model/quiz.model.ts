export interface QuizResponse {
  quizTitle: string;
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  choices: string[];
  answer: number; // Index of the correct choice
}
