import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { userProfile } from '../../Model/userProfile';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: userProfile}

  ) {
    // Configure dialog appearance
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false; // Disable backdrop
    dialogRef.updatePosition(dialogConfig.position);
  }

  onEdit(): void {
    // Handle user edit and update data
    // You can emit the updated user data to the parent component here
    this.dialogRef.close(this.data.user);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  private convertToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.data.user.profilePicturePath = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}
