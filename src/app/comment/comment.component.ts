import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Output() onStatusChange = new EventEmitter<boolean>();

  taskId
  comments = []
  comment = { commenttext: '', commenttype: '', reminderdate: '', dateadded: '', taskid: ''}
  commentTypes = [];
  constructor(private rest: RestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];
    this.getComments();
    this.getCommentTypes();
  }

  getComments(): void {
    this.rest.getProducts("api/Comment/getAllCommentsForTask/" + this.taskId).subscribe((data: []) => {   
      this.comments = data;
      this.onStatusChange.emit(true)
    });
  }

  getCommentTypes(): void {
    this.rest.getProducts("api/Comment/getAllCommentTypes").subscribe((data: []) => {   
      this.commentTypes = data;
    });
  }

  add(name: string, reminderDate: '', commentType: ''): void {
    this.comment.commenttext = name;
    this.comment.reminderdate = reminderDate
    this.comment.commenttype = commentType
    this.comment.taskid = this.taskId
    this.comment.dateadded = new Date().toDateString()

    this.rest.addComment(this.comment, "api/Comment/addComment").subscribe((result) => {
      this.comments.push(result);
    }, (err) => {
      console.log(err);
    });
  }

  delete(id): void {
    this.rest.deleteProduct(id, "api/Comment/deleteComment/").subscribe((result) => {
      this.ngOnInit();
    }, (err) => {
      console.log(err);
    });
  }

}
