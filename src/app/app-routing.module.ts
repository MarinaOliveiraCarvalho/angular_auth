import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/guards/auth.guard';

const routes: Routes = [
  {
		path:'', 
    loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule),
	},
	{
		path:'dashboard', 
    loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule),
		canActivate:[AuthGuard]
	},
  {
    path: 'todo',
    loadChildren: () => import('./components/todo/todo.module').then((m) => m.TodoModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'task/list/:id',
    loadChildren: () => import('./components/task-list/task-list.module').then((m) => m.TaskListModule),
  },
  {
    path: 'task/creat/:id',
    loadChildren: () => import('./components/task/task.module').then((m) => m.TaskModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
