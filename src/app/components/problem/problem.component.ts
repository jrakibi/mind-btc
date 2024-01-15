import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

    // You can replace these paths with the actual paths to your icons
    problemIcon = 'assets/btcIllustrated/icons/problem.png'; 
    solutionIcon = 'assets/btcIllustrated/icons/solution.png';
    
    // Your text content for each card
    problemText = 'Bitcoin transactions were limited in size and speed due to the block size limit, leading to increased transaction fees and slower confirmation times during peak usage.';
    solutionText = 'SegWit restructures transaction data by segregating the witness (signature) information from the main transaction data. This change effectively increases the number of transactions that can fit into a block without altering the block size limit.';
    
    // Method to handle 'How it works?' button click
    onHowItWorksClick(): void {
      // Implementation for 'How it works?' functionality
      console.log('How it works button clicked!');
    }
}
