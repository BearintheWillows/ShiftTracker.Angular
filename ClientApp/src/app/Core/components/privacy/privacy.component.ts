import {RepositoryService} from "../../../Root/services/repository.service";
import {Component, OnInit} from "@angular/core";
interface IClaims {
  type: string;
  value: string;
}
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})

export class PrivacyComponent implements OnInit {

  public claims: IClaims[] = [];

  constructor(private _repository: RepositoryService) { }

  ngOnInit(): void {
    this.getClaims();
  }

  public getClaims = () =>{
    this._repository.getClaims('privacy')
      .subscribe(res => {
        this.claims = res as [];
        console.log(this.claims);
      })
  }
}
