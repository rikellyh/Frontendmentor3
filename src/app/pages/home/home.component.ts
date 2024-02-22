import { Component, HostListener, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { HttpErrorResponse } from '@angular/common/http';
import { GetUnitsService } from '../../services/get-units.service';

@Component({
  selector: 'app-home',
  imports: [MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public countries: Country[] | undefined;

  constructor(private unitService: GetUnitsService) {}

  ngOnInit() {
    this.getCountries();
  }

  public getCountries(): void {
    this.unitService.getCountries().subscribe(
      (response: Country[]) => {
        this.countries = response;
        console.log(this.countries);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private styleManager = inject(StyleManagerService);
  isDark = this.styleManager.isDark;

  inside = false;
  touched =
    '1px solid var(--mdc-outlined-text-field-disabled-input-text-color)';

  onClick() {
    this.touched = '1px solid var(--mat-badge-background-color)';
    this.inside = true;
  }

  @HostListener('document:click')
  clickedOutside() {
    if (!this.inside) {
      this.touched =
        '1px solid var(--mdc-outlined-text-field-disabled-input-text-color)';
    }
    this.inside = false;
  }

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }
}
