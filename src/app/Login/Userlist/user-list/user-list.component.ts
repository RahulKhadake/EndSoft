import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from '../UserService/user-service.service';
import { AddEditUserComponent } from '../UserService/AddUser/add-edit-user/add-edit-user.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../search.pipe';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {


   EmpData:any;
   searchTerm: string = '';

  constructor(private MatDialog:MatDialog,private EmpService:UserServiceService,private dialog: MatDialog,
    private router: Router, private _toast:ToastrService,
  ){}

  ngOnInit()
  {
   
this.GetApiData();
  }
  GetApiData() {
    this.EmpService.GetData().subscribe((data) => {
      this.EmpData = data; // Assign data to EmpData
      console.log("Employee List Data:",data);
      console.log("Employee List Data:",this.EmpData);
    });
  }
  
  AddUser()
  {
   
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '500px',
      height:'800px',
      data: null // No data for add functionality
      // you can pass any initial data here if needed
    });
     // Listen for the dialog result
     dialogRef.afterClosed().subscribe(result => {
      if (result === 'Save') {
        // After saving the employee, refresh the employee list or handle the data accordingly
        this.GetApiData();
      }
    });
  }

  openEditEmployeeDialog(item: any) {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '400px',
      data: item // Pass employee data for edit functionality
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Update' || result === 'Save') {
        this.GetApiData(); // Refresh employee list after closing dialog
      }
    });
  }
  
  deleteEmployee(id: any) {
    // Call the delete method from the service to remove an employee
    if (confirm('Are you sure you want to delete this employee?')) {
      this.EmpService.delete(id).subscribe(() => {
        alert('Employee deleted successfully.');
        this.GetApiData(); // Refresh the employee list after deletion
        this.showError();
      });
    }
   
  }

  logout() {
    // Ask the user for confirmation before logging out
    const confirmation = confirm('Are you sure you want to log out?');
  
    if (confirmation) {
      // Clear the logged-in user session data
      localStorage.removeItem('loggedInUser');
      
      // Optionally, if you want to clear all local storage data, use:
      // localStorage.clear();
      this.showSuccesLogouts();
      // Redirect to the login page
      this.router.navigate(['/login']);
    }
  }
  public showError():void{
    this._toast.error('Data Has Deleted');
  }
  public showSuccesLogouts():void{
    this._toast.success('User Successfully logout');
  }

  
}
