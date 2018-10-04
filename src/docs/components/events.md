---
title: Events
description: Events
url: /docs/events
contributors:
  - jthoms1
---

# Events

Components can emit data and events using the Event Emitter decorator.

To dispatch [Custom DOM events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) for other components to handle, use the `@Event()` decorator.

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

The code above will dispatch a custom DOM event called `todoCompleted`.

## Listening for Events

The `Listen()` decorator is for handling events dispatched from `@Events`.

In the example below, assume that a child component, `TodoList`, emits a `todoCompleted` event using the `EventEmitter`.

```tsx
import { Listen } from '@stencil/core';

...
export class TodoApp {

  @Listen('todoCompleted')
  todoCompletedHandler(event: CustomEvent) {
    console.log('Received the custom todoCompleted event: ', event.detail);
  }
}
```

Handlers can also be registered for an event on a specific element.
This is useful for listening to application-wide events.
In the example below, we're going to listen for the scroll event.

```tsx
import { Listen } from '@stencil/core';

...
export class TodoList {

  @Listen('body:scroll')
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
  }
}
```

For keyboard events, you can use the standard `keydown` event in `@Listen()` and then figure out the key code, or some constants Stencil provides.

```tsx
@Listen('keydown')
handleKeyDown(ev){
  if(ev.keyCode === 40){
    console.log('down arrow pressed')
  }
}

@Listen('keydown.up')
handleUpArrow(ev){
  console.log('will fire when up arrow is pressed');
}

```

Stencil provides constants for the following keys, accessible via `keydown.<CONSTANT>`

- enter
- escape
- space
- tab
- left
- up
- right
- down

## Using events in JSX

You can also bind listeners to events directly in JSX. This works very similar to normal DOM events such as `onClick`.

Lets use our TodoList component from above:

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

We can now listen to this event directly on the component in our JSX using the following syntax:

```tsx
<todo-list onTodoCompleted={ev => this.someMethod(ev)}></todo-list>
```
