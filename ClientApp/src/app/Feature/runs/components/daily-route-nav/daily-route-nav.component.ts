import {AfterViewInit, Component, Input, OnInit, Renderer2} from '@angular/core';
import {IDailyRoutePlan} from "../../../dailyRoutePlans/Models/IDailyRoutePlan";

@Component({
  selector: 'app-daily-route-nav',
  templateUrl: './daily-route-nav.component.html',
  styleUrls: ['./daily-route-nav.component.css']
})
export class DailyRouteNavComponent implements OnInit, AfterViewInit {

  @Input() routes: IDailyRoutePlan[] = [];
  mondayRoute: IDailyRoutePlan[] = [];
  tuesdayRoute: IDailyRoutePlan[] = []
  wednesdayRoute: IDailyRoutePlan[] = []
  thursdayRoute: IDailyRoutePlan[] = []
  fridayRoute: IDailyRoutePlan[] = []
  saturdayRoute: IDailyRoutePlan[] = []
  sundayRoute: IDailyRoutePlan[] = []

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.routes.forEach((route) => {
      switch (route.dayOfWeek) {
        case 1:
          this.mondayRoute.push(route)
          break;
        case 2:
          this.tuesdayRoute.push(route);
          break;
        case 3:
          this.wednesdayRoute.push(route);
          break;
        case 4:
          this.thursdayRoute.push(route);
          break;
        case 5:
          this.fridayRoute.push(route);
          break;
        case 6:
          this.saturdayRoute.push(route);
          break;
        case 7:
          this.sundayRoute.push(route);
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
