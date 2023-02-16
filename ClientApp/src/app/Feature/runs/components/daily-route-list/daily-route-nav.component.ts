import {AfterViewInit, Component, Input, OnInit, Renderer2} from '@angular/core';
import {IDailyRoutePlan} from "../../../dailyRoutePlans/Models/IDailyRoutePlan";

@Component({
  selector: 'app-daily-route-nav',
  templateUrl: './daily-route-nav.component.html',
  styleUrls: ['./daily-route-nav.component.css']
})
export class DailyRouteNavComponent implements OnInit, AfterViewInit {

  @Input() routes: IDailyRoutePlan[] = [];
  mondayRoute: IDailyRoutePlan = {} as IDailyRoutePlan;
  tuesdayRoute: IDailyRoutePlan = {} as IDailyRoutePlan;
  wednesdayRoute: IDailyRoutePlan = {} as IDailyRoutePlan;
  thursdayRoute: IDailyRoutePlan = {} as IDailyRoutePlan;
  fridayRoute: IDailyRoutePlan = {} as IDailyRoutePlan;
  saturdayRoute: IDailyRoutePlan = {} as IDailyRoutePlan;
  sundayRoute: IDailyRoutePlan = {} as IDailyRoutePlan;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.routes.forEach((route) => {
      switch (route.dayOfWeek) {
        case 1:
          this.mondayRoute = route;
          break;
        case 2:
          this.tuesdayRoute = route;
          break;
        case 3:
          this.wednesdayRoute = route;
          break;
        case 4:
          this.thursdayRoute = route;
          break;
        case 5:
          this.fridayRoute = route;
          break;
        case 6:
          this.saturdayRoute = route;
          break;
        case 7:
          this.sundayRoute = route;
          break;
      }
    });

  }

  ngAfterViewInit() {
    const tabList = document.getElementById('shopTabs');
    const tabContent = document.getElementById('shopsContent');
   if(tabList && tabContent) {
      const tabs = Array.from(tabList.querySelectorAll('button[data-bs-toggle="tab"]'));
      tabs.forEach((tab) => {
        tab.addEventListener('click', (event) => {
          event.preventDefault();
          const target = event.target as HTMLElement;

          if(!target.classList.contains('active')) {
            // Remove active class from other tabs
            tabs.forEach((tab) => tab.classList.remove('active'));
            // Add active class to current tab
            target.classList.add('active');
            // Hide other tab content
            const activeContent = tabContent.querySelector('.tab-pane.show.active');
            activeContent?.classList.remove('show', 'active');
            const activeTab = target && target.getAttribute('data-bs-target');

            // Show current tab content
            if(activeTab) {
              const newActiveContent = tabContent.querySelector(activeTab);
              newActiveContent?.classList.add('show', 'active');
            }
          }
        });
      });
    }
  }
}
