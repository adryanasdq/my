import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times!</button>;
}

function MyInput() {
  return <input></input>;
}

const user = {
  name: 'Adryan',
  imgUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imgWidth: 90,
  imgHeight: 120,
};

function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        src={user.imgUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imgWidth,
          height: user.imgHeight,
        }}
      />
    </>
  );
}

function ListItems() {
  const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
    { title: 'Orange', isFruit: true, id: 4 },
  ];

  const listItems = products.map((product) => (
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen',
      }}
    >
      {product.title}
    </li>
  ));

  return <ul>{listItems}</ul>;
}

export { MyButton, MyInput, Profile, ListItems };
