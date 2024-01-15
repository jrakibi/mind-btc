import { Component, OnInit } from '@angular/core';
import { ProblemSolutionResponse } from 'src/app/model/problem-solution.model';
import { AppContext } from 'src/app/services/app-context';
import { OpenaiService } from 'src/app/services/open-ai.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

    // You can replace these paths with the actual paths to your icons
    problemIcon = 'assets/btcIllustrated/icons/problem.png'; 
    solutionIcon = 'assets/btcIllustrated/icons/solution.png';
    
    // Your text content for each card
    
    // Method to handle 'How it works?' button click
    onHowItWorksClick(): void {
      // Implementation for 'How it works?' functionality
      console.log('How it works button clicked!');
    }




    problemSolutionData: ProblemSolutionResponse | null = null;
    isLoading: boolean = true; // Initialize as true to show the loader initially

  
    constructor(
      private openaiService: OpenaiService,
      private appContext: AppContext,
    ) { }
  
    ngOnInit(): void {
      this.generateProblemResponse(this.appContext.topic);
  
     }
     generateProblemResponse(topic: string) {
      debugger
      this.isLoading = true; // Start loading
      this.openaiService.generateProblemSolution(topic).subscribe({
        next: (response) => {
          debugger
          this.problemSolutionData = response;
          this.appContext.storeProblemSolutionData(response); // Store the data
          this.isLoading = false; // Stop loading when data is received
  
        },
        error: (err) => {
          debugger
          console.error('Error generating Proble Solution:', err);
          this.isLoading = false; // Stop loading when data is received
  
        }
      });
    }
    
    // Function to shuffle an array
    shuffleArray(array: any) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
    }
    
}
