import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../../shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let titleService: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: Title, useValue: { getTitle: jest.fn().mockReturnValue('title') } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the title', () => {
    expect(component.title).toBe('title');
  });
});
