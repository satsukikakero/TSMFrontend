import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  @ViewChild(CommentComponent) commentComponent:CommentComponent;
  @Input() taskData = { requestbydate: '' , description: '' , typeid: '', statusid: '', createdate: '', nextactiondate: '' };
  task = { taskDetails: { status: {}, type: {} }}
  form = new FormGroup({})
  submitted = false;
  taskTypes: [];
  taskStatuses: [];

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getTask()

    this.rest.getProducts("api/Task/getAllTaskTypes").subscribe((data: []) => {   
      this.taskTypes = data;
    });

    this.rest.getProducts("api/Task/getAllTaskStatuses").subscribe((data: []) => {   
      this.taskStatuses = data;
    });
    this.form = this.formBuilder.group({
      requestbydate: [new Date(this.route.snapshot.params['requiredbydate']).toDateString(), Validators.required],
      description: ['', Validators.required],
      typeid: [Number(this.route.snapshot.params['typeid']), Validators.required],
      statusid: [Number(this.route.snapshot.params['statusid']), Validators.required],
      nextactiondate: [''],
      createdate: [new Date(this.route.snapshot.params['createdate']).toDateString()]
    });
    
  }

  childStatusChanged(finished: boolean) {
    if (finished){
      if(this.commentComponent.comments.length > 0) {
        this.commentComponent.comments.sort((a, b) => new Date(a.reminderDate).getDate() - new Date(b.reminderDate).getDate())
      this.form
    .patchValue({
       nextactiondate: [new Date(this.commentComponent.comments[0].reminderDate).toDateString()]
    })
  }
    }
  }

  get f() { return this.form.controls; }

  updateTask() {

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.setValueToData()
    console.log(this.taskData)
    this.rest.updateProduct(this.taskData, "api/Task/updateTask").subscribe((result) => {
      
      this.router.navigate(['task']);
    }, (err) => {
      console.log(err);
    });
  }

  setValueToData() {
    this.taskData.requestbydate = this.form.get('requestbydate').value
    this.taskData.description = this.form.get('description').value
    this.taskData.statusid = this.form.get('statusid').value
    this.taskData.typeid = this.form.get('typeid').value
    this.commentComponent.comments.sort((a, b) => new Date(a.reminderDate).getDate() - new Date(b.reminderDate).getDate())
    if(this.commentComponent.comments.length > 0) {
      this.taskData.nextactiondate = this.commentComponent.comments[0].reminderDate
    }
    
    this.taskData.createdate = new Date().toDateString()
  }

  getTask() {
    this.rest.getTask(this.route.snapshot.params['id'],"api/Task/getTaskById/").subscribe(res => { 
      this.task = res;
    });
  }
}
