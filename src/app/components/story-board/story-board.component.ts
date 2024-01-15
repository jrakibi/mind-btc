import { Component, OnInit } from '@angular/core';
import { StoryBoardResponse } from 'src/app/model/story-board.model';
import { AppContext } from 'src/app/services/app-context';
import { OpenaiService } from 'src/app/services/open-ai.service';

interface Scene {
  sceneNumber: number;
  text: string;
}

@Component({
  selector: 'app-storyboard',
  templateUrl: './story-board.component.html',
  styleUrls: ['./story-board.component.css']
})
export class StoryBoardComponent implements OnInit {
  storyData: StoryBoardResponse | null = null;
  isLoading: boolean = true; // Initialize as true to show the loader initially

//   storyData = {
//   "title": "The Journey of AssumeUTXO: A Bitcoin Adventure",
//   "scenes": [
//     {
//       "sceneNumber": 1,
//       "title": "The Genesis of Bitcoin",
//       "text": "Imagine a new world, a digital realm of Bitcoin, where transactions form the landscape. Each transaction is like a building block, contributing to the ever-growing structure of the blockchain.",
//       "imageUrl": "assets/btcIllustrated/storyboard/storyboard.png"
//     },
//     {
//       "sceneNumber": 2,
//       "title": "The Challenge of Syncing",
//       "text": "In this world, new explorers (new nodes) must understand the entire history (blockchain) to participate fully. But the history is vast and takes time to learn, slowing down their readiness for action.",
//       "imageUrl": "assets/btcIllustrated/storyboard/storyboard.png"
//     },
//     {
//       "sceneNumber": 3,
//       "title": "The Introduction of AssumeUTXO",
//       "text": "To tackle this, wise elders introduce 'AssumeUTXO', a magical map. This map doesn't show every detail of the past, but it accurately represents the current state, allowing new explorers to act quickly without knowing all history.",
//       "imageUrl": "assets/btcIllustrated/storyboard/storyboard.png"
//     },
//     {
//       "sceneNumber": 4,
//       "title": "Understanding AssumeUTXO",
//       "text": "AssumeUTXO is like a trusted snapshot of the realm, capturing all existing transactions in a compact, verified form. It's a foundation that new nodes use to build their understanding and trust.",
//       "imageUrl": "assets/btcIllustrated/storyboard/storyboard.png"
//     },
//     {
//       "sceneNumber": 5,
//       "title": "The Benefit of Speed",
//       "text": "With AssumeUTXO, new nodes can start their journey faster, engaging in the realm's activities without the long wait. It's like starting a journey with a trusted guidebook instead of compiling one's own.",
//       "imageUrl": "assets/btcIllustrated/storyboard/storyboard.png"
//     },
//     {
//       "sceneNumber": 6,
//       "title": "Maintaining Security",
//       "text": "While AssumeUTXO accelerates the start, it doesn't compromise on security. Nodes eventually learn the full history, ensuring their map aligns with the true state of the realm.",
//       "imageUrl": "assets/btcIllustrated/storyboard/storyboard.png"
//     },
//     {
//       "sceneNumber": 7,
//       "title": "The Ongoing Journey",
//       "text": "As the Bitcoin world continues to evolve, AssumeUTXO adapts, providing newer, updated maps. This ensures that all explorers, new and old, are always in sync with the current reality.",
//       "imageUrl": "assets/btcIllustrated/storyboard/storyboard.png"
//     },
//     {
//       "sceneNumber": 8,
//       "title": "The Impact on the Network",
//       "text": "AssumeUTXO not only speeds up node synchronization but also strengthens the network by allowing more nodes to participate efficiently, ensuring the realm's robustness and resilience.",
//       "imageUrl": "assets/btcIllustrated/storyboard/storyboard.png"
//     },
//     {
//       "sceneNumber": 9,
//       "title": "Conclusion: Embracing AssumeUTXO",
//       "text": "In the end, AssumeUTXO stands as a testament to innovation in Bitcoin, a tool that empowers faster engagement while upholding the principles of trust and verification that are core to the blockchain ethos.",
//       "imageUrl": "assets/btcIllustrated/storyboard/storyboard.png"
//     }
//   ]
// }


  constructor(
    private openaiService: OpenaiService,
    private appContext: AppContext,
  ) { }

  ngOnInit(): void {
    this.generateStoryBoard(this.appContext.topic);

   }
   generateStoryBoard(topic: string) {
    debugger
    this.isLoading = true; // Start loading
    this.openaiService.generateStoryBoard(topic).subscribe({
      next: (response) => {
        debugger
        // Path to the stick figures folder
        const basePath = 'assets/btcIllustrated/stick-figures/';
        // Array of available stick figure images
        let stickFigures = [
          'stick-figure-1.png', 'stick-figure-2.png', 'stick-figure-3.png',
          'stick-figure-4.png', 'stick-figure-5.png', 'stick-figure-6.png',
          'stick-figure-7.png', 'stick-figure-8.png', 'stick-figure-9.png',
          'stick-figure-10.png'
        ];
  
        // Shuffle the array of stick figure images
        stickFigures = this.shuffleArray(stickFigures);
  
        // Assign a unique image to each scene
        response.scenes.forEach((scene, index) => {
          // Use modulo operator to loop over the array if there are more scenes than images
          const imageIndex = index % stickFigures.length;
          const selectedImage = stickFigures[imageIndex];
          scene.imageUrl = `${basePath}${selectedImage}`;
        });
  
        this.storyData = response;
        this.appContext.storeStoryBoardData(response); // Store the data
        this.isLoading = false; // Stop loading when data is received

      },
      error: (err) => {
        debugger
        console.error('Error generating storyboard:', err);
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
