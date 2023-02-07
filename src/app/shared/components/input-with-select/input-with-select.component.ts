import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Account } from '../../../core/interfaces/model';

@Component({
  selector: 'app-input-with-select',
  templateUrl: './input-with-select.component.html',
  styleUrls: ['./input-with-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: InputWithSelectComponent, multi: true}
  ]
})
export class InputWithSelectComponent implements ControlValueAccessor, OnInit {
  /**
   * The list of elements for select-input
   */
  @Input() list!: Array<keyof Account>;
  /**
   * The labels for input and select fields(optional)
   *
   * @param inputLabel The label for input field
   * @param selectLabel The label for select field
   */
  @Input() labels!: { inputLabel?: string, selectLabel?: string };
  group: FormGroup<{
    select: FormControl<string | null>,
    input: FormControl<string | null>
  }>;
  constructor(fb: FormBuilder) {
    this.group = fb.group({
      select: [''],
      input: ['']
    });
  }

  ngOnInit(): void {
  }

  writeValue(value: any) {
    if (value) {
      this.group.setValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this.group.valueChanges.subscribe(fn);
  }

  registerOnTouched() {}
}
