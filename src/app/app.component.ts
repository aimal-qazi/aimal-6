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

  selAllTask: boolean = false;

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      item: new FormControl('', [Validators.required]),
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
  }

  del(index: number) {
    this.items.splice(index, 1);
  }

  toggle(index: number) {
    this.isActive[index] = !this.isActive[index];
  }

  edit(index: number) {
    this.itemIndex = index;
    let editing = this.items[index].item;
    this.itemForm.setValue({ item: editing });
  }

  close() {
    this.itemIndex = null;
    this.itemForm.reset();
  }

  delAll() {
    this.items = [];
  }

  selAll() {
    this.selAllTask = !this.selAllTask;
    this.isActive = this.items.map(() => this.selAllTask);
  }
}
