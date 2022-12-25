# use-react-infinite-scroll
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

A hook to make all your infinite scrolling and loading more with just `<1kB` and `one line code`! 
`Pull Down to Load More` feature actually works and super-simple to integrate!

## Installation

### npm
`npm install use-react-infinite-scroll`
### yarn
`yarn add use-react-infinite-scroll`
### import
`import { useInfiniteScroll } from "use-react-infinite-scroll"`
### usage
Use function as a React [hook](https://reactjs.org/docs/hooks-intro.html)

`useInfiniteScroll(listRef, loadMore)`

`listRef` is `ref` to your list container like `<div className="list" ref={listRef}></div>`.

`loadMore` is loadMore `function` you want to pass when window scrolling touch end of list.

## Live examples (Sandbox)

- Infinite scrolling, load more function with react.
### Typescript
[![Edit hovndn](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-load-more-infinite-load-hovndn?file=/src/ListItem.tsx)
### Javascript
[![Edit s7c7di](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-load-more-infinite-load-s7c7di?file=/src/ListItem.js)

## Code examples

### Typescript

```tsx
import React, { useRef, useState } from "react";
import { useInfiniteScroll } from "use-react-infinite-scroll";

// init fakeApi
type TDataItem = {
  id: number;
  title: string;
};
let listFakeData: TDataItem[] = [];
for (let i = 1; i <= 500; i++) {
  listFakeData.push({
    id: i,
    title: `Title ${i}`,
  });
}

export function fakeApi(offset: number, limit: number) {
  return new Promise<{
    list: TDataItem[];
    total: number;
  }>((resolve, reject) => {
    setTimeout(() => {
      resolve({ list: listFakeData.slice(offset, offset + limit), total: 500 });
    }, 500);
  });
}

// component with infinite load
const LIMIT = 20;

function ListItem() {
  const listRef = useRef<HTMLDivElement>(null);
  const [dataObj, setDataObj] = useState<{
    list: TDataItem[];
    total: number;
  }>({
    list: [],
    total: -1, // init for first load
  });
  const [isFetching, setIsFetching] = useState(false);
  async function fetchList() {
    setIsFetching(true);
    // call api to fetch data here
    const response = await fakeApi(dataObj.list.length, LIMIT);
    setDataObj((state) => {
      return {
        list: [...state.list, ...response.list],
        total: response.total, // set total from api response
      };
    });
    setIsFetching(false);
  }
  const loadMore = () => {
    if (isFetching !== true) {
      if (dataObj.total === -1 || dataObj.list.length < dataObj.total) {
        fetchList();
      }
    }
  };

  // apply detect scroll
  useInfiniteScroll(listRef, loadMore);
  return (
    <div className="container">
      <div className="list-item" ref={listRef}>
        {dataObj.list.map((item) => {
          return (
            <div key={item.id}>
              <h1>{item.title}</h1>
            </div>
          );
        })}
      </div>
      {isFetching ? <div>Loading...</div> : null}
    </div>
  );
}

export default ListItem;
```

### Javascript
```jsx
import React, { useRef, useState } from "react";
import { useInfiniteScroll } from "use-react-infinite-scroll";

// init fakeApi
let listFakeData = [];
for (let i = 1; i <= 500; i++) {
  listFakeData.push({
    id: i,
    title: `Title ${i}`,
  });
}
function fakeApi(offset, limit) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ list: listFakeData.slice(offset, offset + limit), total: 500 });
    }, 500);
  });
}

// component with infinite load
const LIMIT = 20;
function ListItem() {
  const listRef = useRef(null);
  const [dataObj, setDataObj] = useState({
    list: [],
    total: -1, // init for first load
  });
  const [isFetching, setIsFetching] = useState(false);
  async function fetchList() {
    setIsFetching(true);
    // call api to fetch data here
    const response = await fakeApi(dataObj.list.length, LIMIT);
    setDataObj((state) => {
      return {
        list: [...state.list, ...response.list],
        total: response.total, // set total from api response
      };
    });
    setIsFetching(false);
  }
  const loadMore = () => {
    if (isFetching !== true) {
      if (dataObj.total === -1 || dataObj.list.length < dataObj.total) {
        fetchList();
      }
    }
  };
  // apply detect scroll
  useInfiniteScroll(listRef, loadMore);
  return (
    <div className="container">
      <div className="list-item" ref={listRef}>
        {dataObj.list.map((item) => {
          return (
            <div key={item.id}>
              <h1>{item.title}</h1>
            </div>
          );
        })}
      </div>
      {isFetching ? <div>Loading...</div> : null}
    </div>
  );
}
export default ListItem;
```

## props
`useInfiniteScroll(listRef, loadMore)`
| name                           | type                               | description                                                                     |
| ------------------------------ | ---------------------------------- | --------------------------------------------------------------------------------|
| **param listRef**              | RefObject<HTMLElement> &#124; null | is ref to your list container like `<div className="list" ref={listRef}></div>` |
| **param loadMore**             | function                           | loadMore function you want to pass when window scrolling touch end of list      |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
  <table>
  <tr>
    <td align="center">
      <a href="https://huynhtuan.dev/">
        <img src="https://avatars.githubusercontent.com/u/38250470?v=4?s=100" width="100px;" alt=""/>
        <br />
        <sub><b>Steve</b></sub>
      </a>
      <br />
      <a href="#huynhtuanwd-steve" title="Maintenance">📖</a>
    </td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification. Contributions of any kind are welcome!


## License

MIT