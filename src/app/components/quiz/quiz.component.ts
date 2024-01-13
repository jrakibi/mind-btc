import { Component } from '@angular/core';
import { AnswerDialogComponent } from '../answer-dialog/answer-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface Question {
  text: string;
  choices: string[];
  answer: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

 questions: Question[] = [
  {
    text: "What does AssumeUTXO primarily help to improve in the Bitcoin network?",
    choices: ["Transaction Fees", "Node Synchronization Speed", "Wallet Security", "Block Size Limit"],
    answer: "Node Synchronization Speed"
  },
  {
    text: "AssumeUTXO can be best described as:",
    choices: ["A new cryptocurrency", "A consensus algorithm", "A snapshot of UTXO set", "A wallet interface"],
    answer: "A snapshot of UTXO set"
  },
  // {
  //   text: "Which aspect of Bitcoin does AssumeUTXO aim to address?",
  //   choices: ["Mining Difficulty", "Blockchain Scalability", "Energy Consumption", "Initial Blockchain Download (IBD) Time"],
  //   answer: "Initial Blockchain Download (IBD) Time"
  // },
  // {
  //   text: "AssumeUTXO is mainly useful for:",
  //   choices: ["Experienced Bitcoin users", "Bitcoin miners", "New nodes joining the network", "Regulatory bodies"],
  //   answer: "New nodes joining the network"
  // },
  // {
  //   text: "How does AssumeUTXO affect the security of the Bitcoin network?",
  //   choices: ["Significantly increases it", "Has no effect", "Temporarily reduces it until full sync", "Significantly reduces it"],
  //   answer: "Temporarily reduces it until full sync"
  // },
  // {
  //   text: "What is the ultimate goal of a node using AssumeUTXO?",
  //   choices: ["To replace traditional blockchain verification", "To never download the full blockchain", "To achieve full node status faster", "To act as a lightweight client"],
  //   answer: "To achieve full node status faster"
  // }
];
  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedChoice: string | null = null;
  showResult: boolean = false;
  isAnswerCorrect: boolean | null = null;
  answerSubmitted: boolean = false; // Initially false
  showFooter: boolean = false;
  footerClass: string = '';
  constructor(public dialog: MatDialog) {}

  selectChoice(choice: string): void {
    this.selectedChoice = choice;
  }


  submitAnswer(): void {
    const correct = this.selectedChoice === this.questions[this.currentQuestionIndex].answer;
    this.isAnswerCorrect = correct;
    
    if (correct) {
      this.score++;
    }
    
    this.answerSubmitted = true; // Set this to true to indicate that an answer has been submitted
  
    // Open the dialog for correct/incorrect answer
    // this.dialog.open(AnswerDialogComponent, {
    //   width: '600px',
    //   data: { 
    //     isCorrect: correct, 
    //     explanation: correct ? 'You got it right!' : 'Oops, that’s not right.' 
    //   }
    // });
  
    // Do not increment currentQuestionIndex here

    this.footerClass = correct ? 'correct-footer' : 'incorrect-footer';
    this.showFooter = true;

    setTimeout(() => {
      this.showFooter = false; // Hide the footer after some time
      this.goToNextQuestion(); // Move to the next question

    }, 3000); // Adjust the time as needed

  }
  
  
  // Add method to move to the next question which can be called after closing the dialog
  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedChoice = null;
      this.isAnswerCorrect = null;
      this.answerSubmitted = false; // Reset the flag
    } else {
      this.showResult = true;
    }
  }
  

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showResult = false;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedChoice = null; // Reset the selected choice
      this.answerSubmitted = false; // Reset the submission state
      this.isAnswerCorrect = null; // Reset the correctness state
    }
  }
  
  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedChoice = null; // Reset the selected choice
      this.answerSubmitted = false; // Reset the submission state
      this.isAnswerCorrect = null; // Reset the correctness state
    }
  }
  
}
