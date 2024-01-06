import { Component, OnInit } from '@angular/core';

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
  storyData = {
  "title": "The Journey of AssumeUTXO: A Bitcoin Adventure",
  "scenes": [
    {
      "sceneNumber": 1,
      "title": "The Genesis of Bitcoin",
      "text": "Imagine a new world, a digital realm of Bitcoin, where transactions form the landscape. Each transaction is like a building block, contributing to the ever-growing structure of the blockchain.",
      "imageUrl": "https://media.licdn.com/dms/image/C5612AQGA_b_w5-i3KQ/article-inline_image-shrink_400_744/0/1641429936131?e=1707350400&v=beta&t=_7qSaNgb0iKlA9zWW7TFShCzDktapb5ovzxR3zZU3RM"
    },
    {
      "sceneNumber": 2,
      "title": "The Challenge of Syncing",
      "text": "In this world, new explorers (new nodes) must understand the entire history (blockchain) to participate fully. But the history is vast and takes time to learn, slowing down their readiness for action.",
      "imageUrl": "https://media.licdn.com/dms/image/C5612AQGA_b_w5-i3KQ/article-inline_image-shrink_400_744/0/1641429936131?e=1707350400&v=beta&t=_7qSaNgb0iKlA9zWW7TFShCzDktapb5ovzxR3zZU3RM"
    },
    {
      "sceneNumber": 3,
      "title": "The Introduction of AssumeUTXO",
      "text": "To tackle this, wise elders introduce 'AssumeUTXO', a magical map. This map doesn't show every detail of the past, but it accurately represents the current state, allowing new explorers to act quickly without knowing all history.",
      "imageUrl": "https://media.licdn.com/dms/image/C5612AQGA_b_w5-i3KQ/article-inline_image-shrink_400_744/0/1641429936131?e=1707350400&v=beta&t=_7qSaNgb0iKlA9zWW7TFShCzDktapb5ovzxR3zZU3RM"
    },
    {
      "sceneNumber": 4,
      "title": "Understanding AssumeUTXO",
      "text": "AssumeUTXO is like a trusted snapshot of the realm, capturing all existing transactions in a compact, verified form. It's a foundation that new nodes use to build their understanding and trust.",
      "imageUrl": "https://media.licdn.com/dms/image/C5612AQGA_b_w5-i3KQ/article-inline_image-shrink_400_744/0/1641429936131?e=1707350400&v=beta&t=_7qSaNgb0iKlA9zWW7TFShCzDktapb5ovzxR3zZU3RM"
    },
    {
      "sceneNumber": 5,
      "title": "The Benefit of Speed",
      "text": "With AssumeUTXO, new nodes can start their journey faster, engaging in the realm's activities without the long wait. It's like starting a journey with a trusted guidebook instead of compiling one's own.",
      "imageUrl": "https://media.licdn.com/dms/image/C5612AQGA_b_w5-i3KQ/article-inline_image-shrink_400_744/0/1641429936131?e=1707350400&v=beta&t=_7qSaNgb0iKlA9zWW7TFShCzDktapb5ovzxR3zZU3RM"
    },
    {
      "sceneNumber": 6,
      "title": "Maintaining Security",
      "text": "While AssumeUTXO accelerates the start, it doesn't compromise on security. Nodes eventually learn the full history, ensuring their map aligns with the true state of the realm.",
      "imageUrl": "https://media.licdn.com/dms/image/C5612AQGA_b_w5-i3KQ/article-inline_image-shrink_400_744/0/1641429936131?e=1707350400&v=beta&t=_7qSaNgb0iKlA9zWW7TFShCzDktapb5ovzxR3zZU3RM"
    },
    {
      "sceneNumber": 7,
      "title": "The Ongoing Journey",
      "text": "As the Bitcoin world continues to evolve, AssumeUTXO adapts, providing newer, updated maps. This ensures that all explorers, new and old, are always in sync with the current reality.",
      "imageUrl": "https://media.licdn.com/dms/image/C5612AQGA_b_w5-i3KQ/article-inline_image-shrink_400_744/0/1641429936131?e=1707350400&v=beta&t=_7qSaNgb0iKlA9zWW7TFShCzDktapb5ovzxR3zZU3RM"
    },
    {
      "sceneNumber": 8,
      "title": "The Impact on the Network",
      "text": "AssumeUTXO not only speeds up node synchronization but also strengthens the network by allowing more nodes to participate efficiently, ensuring the realm's robustness and resilience.",
      "imageUrl": "https://media.licdn.com/dms/image/C5612AQGA_b_w5-i3KQ/article-inline_image-shrink_400_744/0/1641429936131?e=1707350400&v=beta&t=_7qSaNgb0iKlA9zWW7TFShCzDktapb5ovzxR3zZU3RM"
    },
    {
      "sceneNumber": 9,
      "title": "Conclusion: Embracing AssumeUTXO",
      "text": "In the end, AssumeUTXO stands as a testament to innovation in Bitcoin, a tool that empowers faster engagement while upholding the principles of trust and verification that are core to the blockchain ethos.",
      "imageUrl": "https://media.licdn.com/dms/image/C5612AQGA_b_w5-i3KQ/article-inline_image-shrink_400_744/0/1641429936131?e=1707350400&v=beta&t=_7qSaNgb0iKlA9zWW7TFShCzDktapb5ovzxR3zZU3RM"
    }
  ]
}


  constructor() { }

  ngOnInit(): void { }
}
