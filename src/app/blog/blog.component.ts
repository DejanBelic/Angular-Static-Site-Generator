import { Component, OnInit } from '@angular/core';
import {ScullyRoutesService} from "@scullyio/ng-lib-v8";
import { combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private scully: ScullyRoutesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.scully.available$.subscribe(routes => console.log(routes))
  }
  $blogPostMetadata = combineLatest([
    this.activatedRoute.params.pipe(pluck('postId')),
    this.scully.available$
  ]).pipe(
    map(([postId, routes]) =>
      routes.find(route => route.route === `/blog/${postId}`)
    )
  );
}
