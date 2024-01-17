import { Component, OnInit } from '@angular/core';
import { AnswerDialogComponent } from '../answer-dialog/answer-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppContext } from 'src/app/services/app-context';
import { OpenaiService } from 'src/app/services/open-ai.service';
import { Question, QuizResponse } from 'src/app/model/quiz.model';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit  {

 questions: Question[] = [];

  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedChoice: number | null = null;
  showResult: boolean = false;
  isAnswerCorrect: boolean | null = null;
  answerSubmitted: boolean = false; // Initially false
  showFooter: boolean = false;
  footerClass: string = '';
  totalQuestions: number = 0; // Total number of questions in the quiz
  answeredQuestions: number = 0; // Number of questions answered so far
  quizData: QuizResponse | null = null;
  isLoading: boolean = true; // Initialize as true to show the loader initially

  constructor(public dialog: MatDialog,
    private openaiService: OpenaiService,
    private appContext: AppContext,) {
  }

  ngOnInit(): void {
    this.generateQuizResponse(this.appContext.topic);

   }

   generateQuizResponse(topic: string) {
    
    this.isLoading = true; // Start loading
    this.openaiService.generateQuizResponse(topic).subscribe({
      next: (response) => {
        
        this.quizData = response;
        this.questions = this.quizData.questions
        this.totalQuestions = this.questions.length

        this.appContext.storeQuizData(response); // Store the data
        this.isLoading = false; // Stop loading when data is received

      },
      error: (err) => {
        
        console.error('Error generating Proble Solution:', err);
        this.isLoading = false; // Stop loading when data is received

      }
    });
  }
  

  selectChoice(choiceNumber: number): void {
    
    this.selectedChoice = choiceNumber;
  }


  submitAnswer(): void {
    this.answerSubmitted = true;
  this.answeredQuestions++; 
  const correct = this.selectedChoice === this.questions[this.currentQuestionIndex].answer;
  this.isAnswerCorrect = correct;

  if (correct) {
    this.score++;
  }

    
    
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

    }, 3000); // Adjust the time as needed

  }
  
  
  // Add method to move to the next question which can be called after closing the dialog
  goToNextQuestion(): void {
    this.showFooter = false
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedChoice = null;
      this.isAnswerCorrect = null;
      this.answerSubmitted = false; // Reset the flag
    } else {
      this.showResult = true;
    }
  }

  showQuizResults(): void {
    this.showFooter = false
    this.showResult = true;
  }
  
  

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.showResult = false;
    this.answeredQuestions = 0
    this.selectedChoice = null
    this.answerSubmitted = false
  }

  nextQuestion(): void {
    this.showFooter = false
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedChoice = null; // Reset the selected choice
      this.answerSubmitted = false; // Reset the submission state
      this.isAnswerCorrect = null; // Reset the correctness state
    }
  }
  
  previousQuestion(): void {
    this.showFooter = false

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedChoice = null; // Reset the selected choice
      this.answerSubmitted = false; // Reset the submission state
      this.isAnswerCorrect = null; // Reset the correctness state
    }
  }

  allQuestionsAnswered(): boolean {
    return this.answeredQuestions === this.totalQuestions;
  }
  
  
}
