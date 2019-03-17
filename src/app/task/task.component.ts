import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() tasks:any = [];
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getTasks()
  }

  getTasks() {
    this.tasks = [];
    this.rest.getProducts("api/Task/getAllTasks").subscribe((data: {}) => {
      console.log(data);
      this.tasks = data;
    });
  }

  deleteTask(id) {
    console.log(id)
    this.rest.deleteTask(id).subscribe((result) => {
      this.ngOnInit();
      console.log("Task deleted");
    }, (err) => {
      console.log(err);
    });
  }

}
