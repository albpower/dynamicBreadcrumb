import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private currentNews: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  setNews(news: any){
    this.currentNews.next(news);
  }

  getNews(): Observable<any>{
    return this.currentNews.asObservable();
  }
}
