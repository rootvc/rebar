const React = require('react')
const ReactDOM = require('react-dom')

const DrinkGridArray = require('./components/DrinkGridArray')
const OrderForm = require('./components/OrderForm')
const ThankYouPage = require('./components/ThankYouPage')
const TabBar = require('./components/TabBar')

// Order Page

const drinkGrids = document.getElementById('drink-grids')
const orderForm = document.getElementById('order-form')
const tabBar = document.getElementById('tab-bar')

if (drinkGrids !== null && orderForm !== null) {
  ReactDOM.render(<TabBar />, tabBar)
  
  fetch("https://lee-rebar.builtwithdark.com/inventory")
    .then((res) => res.json())
    .then((json) => {
      ReactDOM.render(<DrinkGridArray drinks={json}/>, drinkGrids)
      ReactDOM.render(<OrderForm/>, orderForm)
    })
}

// Thank You Page

const thankYouPage = document.getElementById('thank-you')
if (thankYouPage !== null) {
  const url = new URL(document.location)
  const orderId = url.searchParams.get("orderId")
  fetch("https://lee-rebar.builtwithdark.com/orders/" + orderId)
    .then((res) => res.json())
    .then((orderJson) => {
      fetch("https://lee-rebar.builtwithdark.com/inventory/" + orderJson.inventoryId)
        .then((res) => res.json())
        .then((inventoryJson) => {
          ReactDOM.render(<ThankYouPage order={orderJson} drink={inventoryJson} />, thankYouPage)
        })
    })
}
