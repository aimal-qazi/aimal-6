import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  itemForm!: FormGroup;

  items: any[] = [];

  isActive: any[] = [];

  itemIndex: any = null;

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      item: new FormControl('', [Validators.required]),
      ischeck: new FormControl(false),
    });
  }

  onItem() {
    let itemData = this.itemForm.getRawValue();
    if (this.itemIndex !== null) {
      this.items[this.itemIndex].item = this.itemForm.value.item;
      this.itemIndex = null;
    } else {
      this.items.push(itemData);
    }
    this.itemForm.reset();
    console.log(itemData);
  }

  del(index: number) {
    this.items.splice(index, 1);
  }

  toggle(index: number) {
    this.items[index].ischeck = !this.items[index].ischeck;
  }

  edit(index: number) {
    this.itemIndex = index;
    let editing = this.items[index].item;
    this.itemForm.patchValue({ item: editing });
  }

  close() {
    this.itemIndex = null;
    this.itemForm.reset();
  }

  delAll() {
    this.items = [];
  }

  selAll() {
    this.items.forEach((a) => {
      a.ischeck = true;
    });
  }
  deSelAll() {
    this.items.forEach((a) => {
      a.ischeck = false;
    });
  }
}
