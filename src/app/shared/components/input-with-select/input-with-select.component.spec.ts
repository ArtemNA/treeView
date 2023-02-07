import { FormBuilder } from '@angular/forms';
import { InputWithSelectComponent } from './input-with-select.component';

describe('InputWithSelectComponent', () => {
  let component: InputWithSelectComponent;
  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();
    component = new InputWithSelectComponent(fb);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value', () => {
    const value = { select: 'test', input: 'test' };
    component.writeValue(value);
    expect(component.group.value).toEqual(value);
  });

  it('should register on change', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.group.get('select')?.setValue('test');
    expect(fn).toHaveBeenCalledWith({ select: 'test', input: '' });
  });
});
