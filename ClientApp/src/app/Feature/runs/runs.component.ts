import {Component, OnInit} from '@angular/core';
import {RepositoryService} from "../../Root/services/repository.service";

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.css']
})
export class RunsComponent implements OnInit {

  public claims: [] = [];

  constructor() { }

  ngOnInit() {
  }

}
