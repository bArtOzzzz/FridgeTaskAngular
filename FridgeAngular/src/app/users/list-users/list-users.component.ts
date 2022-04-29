import { Component, OnInit } from '@angular/core';
import { FridgeService } from 'src/app/services/fridge.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  listUsers: any=[];
  userGmail: any;
  pages: number = 1;
  user: any;

  activateModalComponent: boolean = false;

  constructor(private fridgeService: FridgeService) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  // Searching the user
  Search() {
    if (this.userGmail == '') {
      this.ngOnInit();
    }
    else {
      this.listUsers = this.listUsers.filter((res: { gmail: string; }) => {
        return res.gmail.toLocaleLowerCase().match(this.userGmail.toLocaleLowerCase());
      })
    }
  }
  
  // Get users
  getUsersList() {
    this.fridgeService.getUser().subscribe(data => {
      this.listUsers = data;
      console.log("Recount users");
    })
  }

  // onClick for close/cancel button
  modalClose() {
    this.getUsersList();
    console.log("Page updated and modal closed");
  }

  // Delete user
  deleteUser(userId: string) {
    if(confirm(`Are you sure you want to delete this user`)) {
      this.fridgeService.deleteUser(userId).subscribe(ref => {
        this.modalClose();
        var showCreateSuccess = document.getElementById('delete-success-alert');
        if (showCreateSuccess) {
          showCreateSuccess.style.display = "block";
          console.log("Showing success alert");
        }
        setTimeout(function() {
          if(showCreateSuccess) {
            showCreateSuccess.style.display = "none";
          }
        }, 4000);
      })
    }
  }

  // onClick for update button
  modalUpdateOpen(user: any) {
    this.user = user;
    this.activateModalComponent = true;
    console.log("Modal window open");
  }
}
