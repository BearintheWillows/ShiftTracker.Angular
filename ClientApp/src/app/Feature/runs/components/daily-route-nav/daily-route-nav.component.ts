import {AfterViewInit, Component, Input, OnInit, Renderer2} from '@angular/core';
import {IDailyRoutePlan} from "../../../dailyRoutePlans/Models/IDailyRoutePlan";
import {IRunVariant} from "../../models/iRunVariant";
import {IRun} from "../../models/iRun";
import {IDeliveryPoint} from "../../models/iDeliveryPoint";

@Component({
  selector: 'app-daily-route-nav',
  templateUrl: './daily-route-nav.component.html',
  styleUrls: ['./daily-route-nav.component.css']
})
export class DailyRouteNavComponent implements OnInit, AfterViewInit {

  @Input() dailyRoutes: IRunVariant[] = [];
  mondayDeliveryPoints: IDeliveryPoint[] = [];
  tuesdayDeliveryPoints: IDeliveryPoint[] = [];
  wednesdayDeliveryPoints: IDeliveryPoint[] = [];
  thursdayDeliveryPoints: IDeliveryPoint[] = [];
  fridayDeliveryPoints: IDeliveryPoint[] = [];
  saturdayDeliveryPoints: IDeliveryPoint[] = [];
  sundayDeliveryPoints: IDeliveryPoint[] = [];

  selectedRunVariant: IRunVariant = {} as IRunVariant;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.dailyRoutes.forEach((route) => {
      switch (route.dayOfWeek) {
        case 1:
          this.mondayDeliveryPoints = route.deliveryPoints;

          break;
        case 2:
          this.tuesdayDeliveryPoints= route.deliveryPoints;
          break;
        case 3:
          this.wednesdayDeliveryPoints = route.deliveryPoints;
          break;
        case 4:
          this.thursdayDeliveryPoints = route.deliveryPoints;
          break;
        case 5:
          this.fridayDeliveryPoints = route.deliveryPoints;
          break;
        case 6:
          this.saturdayDeliveryPoints= route.deliveryPoints;
          break;
        case 0:
          this.sundayDeliveryPoints = route.deliveryPoints;
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
