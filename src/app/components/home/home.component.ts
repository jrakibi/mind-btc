import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Workspace } from 'src/app/enums/workspace.enum';
import { AppContext } from 'src/app/services/app-context';
import { OpenaiService } from 'src/app/services/open-ai.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() createMindMapClicked = new EventEmitter<boolean>();

  showDropdown: string | null = null;
  form: FormGroup;
  isLoading = false; // New property to manage loader state
  Workspace = Workspace
  activeWorkspace: Workspace = Workspace.StoryBoard

  constructor(
    private http: HttpClient,
    private router: Router,
    private openaiService: OpenaiService,
    private appContext: AppContext,
    ) {
      
    this.form = new FormGroup({
      topic: new FormControl(''),
      workflow: new FormControl(''), // Assuming single selection for simplicity
      tone: new FormControl(''), // Assuming single selection for simplicity
    });
  }

  ngOnInit(): void {
    // this.activeWorkspace = this.appContext.retrieveActiveWorkspace() ?? Workspace.MindMap
    // this.showWorkspace(this.activeWorkspace)
  }

  submitData() {
    debugger
    this.isLoading = true; 

    if (this.form.valid) {
      const topic = this.form.get('topic')?.value;
      this.appContext.storeTopic(topic)
      this.isLoading = false; // Hide loading animation
      this.showWorkspace(this.activeWorkspace)
      // this.openaiService.getMindMapper(topic).subscribe({
      //   next: (response) => {
      //     debugger
      //     this.appContext.storeMindMapperData(response); // Store the data
      //     this.isLoading = false; // Hide loading animation
      //     this.router.navigate(['/illustration', 'mindmapper']);
      //   },
      //   error: (err) => {
      //     debugger
      //     this.isLoading = false; // Hide loading animation
      //     console.error('Error generating mind map:', err);


      //   }
      // });
    }
  }


  toggleDropdown(dropdownKey: string) {
    debugger
    this.showDropdown = this.showDropdown === dropdownKey ? null : dropdownKey;
  }

  selectWorkspace(dropdownKey: string, workspace: Workspace) {
    debugger
    this.activeWorkspace = workspace

    this.form.get(dropdownKey)?.setValue(workspace.toString());
    this.showDropdown = null; // Hide dropdown after selection
  }

  selectTone(dropdownKey: string, option: string) {
    debugger
    this.form.get(dropdownKey)?.setValue(option);
    this.showDropdown = null; // Hide dropdown after selection
  }

  selectTag(prompt: string) {
  }

  
  setSearchBarValue(topic: string) {
    // Set the value of topic to the chosen topic
    this.form.get('topic')?.setValue(`${topic}`);
    // Focus on the input field after setting its value
    setTimeout(() => {
      const inputElement: any = document.querySelector('.search-bar-ai input[type="text"]');
      inputElement.focus();
      // Place the cursor at the end of the input value
      const valLength = inputElement.value.length;
      inputElement.setSelectionRange(valLength, valLength);
    }, 0);
  }
  
  createMindMap() {
    debugger
    this.createMindMapClicked.emit(true)
  }

  async showWorkspace(workspace: Workspace) {
    debugger
    this.activeWorkspace = workspace
    this.appContext.storeActiveWorkspace(this.activeWorkspace)
    this.router.navigate(['dashboard']);
  }


}
