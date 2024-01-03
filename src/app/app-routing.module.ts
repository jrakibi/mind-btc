import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MindmapComponent } from './components/mindmap/mindmap.component';

const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'mindmap',  component: MindmapComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
