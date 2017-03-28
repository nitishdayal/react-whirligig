# React Whirligig

> Nitish Dayal, Software & Applications Developer - [Contact](mailto:contact@nitishdayal.me)  
> Last Commit Date: March 28, 2017

_Because react-carousel is taken_

A carousel component for React, implemented using a doubly linked list to manage carousel components.

**CURRENTLY UNDER DEVELOPMENT - PULL REQUESTS WELCOME!**

* * *

## About

A recent trend in people disapproving of '`whiteboard algorithm`'-style interviews has 
  got _other_ people saying things like '`algorithms are irrelevant.`' I'm...50/50 on it.
  Personally, I don't spend hours a day trying to solve the latest HackerRank challenge
  or whatever, but I think there's a fair bit of value in learning the standard data
  structures and design patterns. They're used in the real world on a daily
  basis; many of the modern tools that seem complex at first are rooted in these patterns
  and structures, and a basic understanding of such topics will demystify those tools
  quickly.

## Project Minimum Viable Product

Minimum Requirements:

-   External API - Main Carousel Component (React element):
    -   [x] Have left/right nav on sides of carousel component
        -   [ ] Receive optional on/off for left/right nav (boolean)
    -   [ ] Have dot-style nav under carousel corresponding w/ amount of children components
        -   [ ] Receive optional on/off for dot-style nav (boolean)
    -   [x] Receive initial components as children (React elements)
        -   [-] Optional component prop name (string) 🔑 _(...key?)_
    -   [x] Receive optional style as props (React styling thing)
    -   [ ] Receive optional left/right button components as props (components)
    -   [ ] Receive optional scroll time (bool or ms)
-   External API - Add Component (DLL method):
    -   [-] Receive component (React element) 
        _(New Carousel node element created from provided component & added 
          to Carousel state, still need to attach node to DLL/Carousel as new tail)_
    -   [ ] Receive optional location
        -   (number | 'first' | 'last' | 'middle' | 
                    \- 'after first' | 'before middle' | 'after middle' | 'before last' |
                  \- [ number,'before'|'after' ])
        -   Defaults to 'last' (new component is tail of DLL)
-   External API - Remove Component (DLL method):
    -   [ ] Receive location (same parameter options as add component location)
-   External API - Show Component (DLL method):
    -   [ ] Receive location (same parameter options as add component location)
        -   OR
        -   Receive reference to element to be shown (???)
-   External API - Get Component (DLL Method):
    -   [ ] Same parameters as show component

Idk probably more to come feel free to submit PRs. ❤️❤️❤️
