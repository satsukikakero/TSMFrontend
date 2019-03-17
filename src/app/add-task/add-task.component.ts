import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Input() taskData = { requestbydate: '' , description: '' , typeid: '', statusid: '', createdate: '' };
  form: FormGroup
  submitted = false;
  taskTypes: [];
  taskStatuses: [];

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.rest.getProducts("api/Task/getAllTaskTypes").subscribe((data: []) => {   
      this.taskTypes = data;
    });

    this.rest.getProducts("api/Task/getAllTaskStatuses").subscribe((data: []) => {   
      this.taskStatuses = data;
    });

    this.form = this.formBuilder.group({
      requestbydate: ['', Validators.required],
      description: ['', Validators.required],
      typeid: ['', Validators.required],
      statusid: ['', Validators.required],
    });

    
  }

  setProjects(x) {
    let arr = new FormArray([])
    x.forEach(y => {
      arr.push(this.formBuilder.group({ 
        projectName: y.name 
      }))
    })
    return arr;
  }

  get f() { return this.form.controls; }

  addTask() {

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.setValueToData()

    this.rest.addProduct(this.taskData, "api/Task/addTask").subscribe((result) => {
      this.router.navigate(['/cars/']);
    }, (err) => {
      console.log(err);
    });
  }

  setValueToData() {
    this.taskData.requestbydate = this.form.get('requestbydate').value
    this.taskData.description = this.form.get('description').value
    this.taskData.statusid = this.form.get('statusid').value
    this.taskData.typeid = this.form.get('typeid').value
    this.taskData.createdate = new Date().toDateString()
  }

}
