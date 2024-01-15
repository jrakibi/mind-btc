export interface Scene {
  sceneNumber: number;
  title: string;
  text: string;
  imageUrl: String
}

export interface StoryBoardResponse {
  title: string;
  scenes: Scene[];
}
