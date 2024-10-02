import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from '../../user-service.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css'
})
export class AddEditUserComponent {
  isEdit = false;
  Userforms!:FormGroup
  constructor(public dailog:MatDialog,public fb:FormBuilder,private EmpService:UserServiceService, private _toast:ToastrService,
     private dialogRef:MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
  
   this.Userforms=fb.group({
    first:['',Validators.required],
    address:['',Validators.required],
    dob: ['', [Validators.required]], // Date validation (DD-MM-YYYY format)
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ],
    ],
    mobile: [  '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'), // 10 digits mobile number
      ],]
   })
  }

  ngOnInit() {
    if (this.data) {
      // If data is passed, we are editing an existing employee
      this.isEdit = true;
      this.Userforms.patchValue(this.data); // Populate form with employee data
    }
  }
  
    CloseDialog()
    {
      this.dailog.closeAll();
    }
    SaveData() {
      const user = this.Userforms.value;
    
      // Check if this.data exists and has an id (for edit mode)
      const id = this.data?.id; // Optional chaining to safely access id
    
      if (this.Userforms.valid) {
        if (this.isEdit && id) {
          // Update the employee if it's an edit operation
          this.EmpService.updateEmployee(id, user).subscribe((res) => {
            console.log('Employee updated:', res);
            this.dialogRef.close('Update'); // Close dialog with 'Update'
            this.showInfo();
          });
        } else {
          // Add new employee if it's an add operation
          this.EmpService.postAPIdata(user).subscribe((res) => {
            console.log('Employee added:', res);
            this.showSuccess();
            this.dialogRef.close('Save'); // Close dialog with 'Save'
          });
        }
    
        this.Userforms.reset();
      } else {
        alert('Please fill all required fields');
      }
    }
    public showSuccess():void{
      this._toast.success('User Data Successfully Added');
    }
  
    public showInfo():void{
      this._toast.info('Data Has Successfully Updated')
    }
}
