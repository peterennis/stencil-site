import { Component, Prop, ComponentInterface, Listen, State } from '@stencil/core';
import { MarkdownHeading } from '../../global/definitions';

interface ItemOffset {
  id: string,
  topOffset: number
}

@Component({
  tag: 'in-page-navigation',
  styleUrl: 'in-page-navigation.css'
})
export class InPageNavigtion implements ComponentInterface {

  @Listen('window:scroll')
  function() {
    const item = this.itemOffsets.find(item => item.topOffset > window.scrollY);
    if (item) {
      this.selectedId = item.id;
    }
  }

  @Prop() pageLinks: MarkdownHeading[] = [];
  @Prop() srcUrl: string = '';
  @Prop() currentPageUrl: string = '';
  @State() itemOffsets: ItemOffset[] = [];
  @State() selectedId: string = null;

  componentDidLoad() {
    this.itemOffsets = this.pageLinks.map((pl) => {
      const item = document.getElementById(pl.id);
      return {
        id: pl.id,
        topOffset: item.getBoundingClientRect().top
      };
    })
  }

  render() {
    const pageLinks = this.pageLinks.filter(pl => pl.level !== 1);
    const submitEditLink = (
       <a class="submit-edit-link" href={`https://github.com/ionic-team/stencil-site/blob/master/${this.srcUrl}`}>
         <app-icon name="github"></app-icon>
         <span>Submit an edit</span>
       </a>
    );

    if (pageLinks.length === 0) {
      return (
        <div class="sticky">
          { submitEditLink }
        </div>
      );
    }

    return (
      <div class="sticky">
        <h5>Contents</h5>
        <ul class="heading-links">
          { pageLinks.map(pl => (
          <li class={{
              'heading-link': true,
              [`size-h${pl.level}`]: true,
              'selected': this.selectedId === pl.id
            }}>
            <stencil-route-link url={`${this.currentPageUrl}#${pl.id}`}>{pl.text}</stencil-route-link>
          </li>
          )) }
        </ul>
        { submitEditLink }
      </div>
    );
  }
}
