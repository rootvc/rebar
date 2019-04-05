const React = require('react')

const {MDCTextField} = require('@material/textfield')
const {MDCChipSet} = require('@material/chips')

// TODO: Refactor ComponentDidMount

class OrderForm extends React.Component {
  constructor(props) {
    super(props)
    this.setState({})
  }
  
  componentDidMount() {    
    const textFields = document.querySelectorAll('.mdc-text-field')
    textFields.forEach(tf => {
      const textField = new MDCTextField(tf)
    })

    const chipSetEl = document.querySelector('.mdc-chip-set')
    const chipSet = new MDCChipSet(chipSetEl)

    let currentOrderCardForm = null
    const animatingClass = 'order-form__animating-container--animating'
    const animatingContainerClass = 'order-form__animating-container'
    const orderFormHiddenClass = 'order-form--hidden'
    const orderForm = document.querySelector('.order-form')
    const orderFormTriggers = document.querySelectorAll('.order-form__button, .rebar-image')

    const removeForm = (card) => {
      const animatingOrderForm = card.querySelector(`.${animatingContainerClass}`)
      const cardActions = card.querySelector('.mdc-card__actions')
      cardActions.querySelector('.order-form__button-text').innerText = 'Order'
      cardActions.querySelector('.order-form__button-icon').innerText = 'local_drink'
      
      const formElement = orderForm.querySelector('form')
      formElement.submit()
      // TODO: disable button

      animatingOrderForm.classList.add(animatingClass)
      setTimeout(() => {
        if (!card) return
        card.removeChild(orderForm)
        document.body.appendChild(orderForm)
        orderForm.classList.add(orderFormHiddenClass)
      }, 200)
    }

    const addForm = (card) => {
      const cardActions = card.querySelector('.mdc-card__actions')
      orderForm.classList.remove(orderFormHiddenClass)

      requestAnimationFrame(() => {
        card.insertBefore(orderForm, cardActions)
        cardActions.querySelector('.order-form__button-text').innerText = 'OK'
        cardActions.querySelector('.order-form__button-icon').innerText = 'check_circle'
        const animatingOrderForm = card.querySelector(`.${animatingContainerClass}`)

        animatingOrderForm.classList.add(animatingClass)
        requestAnimationFrame(() => {
          animatingOrderForm.classList.remove(animatingClass)
        })
        
        card.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
        
        card.querySelector('input').focus()
        
        const inventoryId = card.getAttribute("id")
        const inventoryIdField = orderForm.querySelector("#order_inventory-id")
        inventoryIdField.setAttribute("value", inventoryId)
        
        document.querySelectorAll('.order-chip').forEach(c => {
          c.addEventListener('click', handleOrderChipClick)
        })
      })
    }

    const handleOrderFormClick = (e) => {
      // not supported by IE11
      const card = e.target.closest('.mdc-card')

      if (currentOrderCardForm) {
        removeForm(currentOrderCardForm)
        if (currentOrderCardForm === card) {
          currentOrderCardForm = null
          return
        }
      }
      currentOrderCardForm = card
      addForm(currentOrderCardForm)
    }
    
    const handleOrderChipClick = (e) => {
      const quantityField = orderForm.querySelector("#order_quantity")
      const quantity = e.target.closest('.order-chip').getAttribute("value")
      quantityField.setAttribute("value", quantity)
    }
    
    orderFormTriggers.forEach(el => {
      el.addEventListener('click', handleOrderFormClick)
    })    
  }
  
  render() {
    const url = new URL(document.location)
    const coasterId = url.searchParams.get("coasterId")
    
    return (
      <div class="order-form order-form--hidden">
        <form id="order-submit-form" action = "https://lee-rebar.builtwithdark.com/orders" method="post">
          <input type="hidden" id="order_inventory-id" name="inventoryId" value=""></input>
          <input type="hidden" name="coasterId" value={coasterId}></input>

          <div class="order-form__animating-container">
            <p class="mdc-typography--caption">Enjoy your drink at Root Ventures // Rebar. It's on us!</p>

            <div class="mdc-text-field order-form__input-field">
              <input type="text" required id="name-text-field" class="mdc-text-field__input" name="customerName" />
              <label class="mdc-floating-label" for="name-text-field">Your Name</label>
              <div class="mdc-line-ripple"></div>
            </div>

            <div class="mdc-text-field order-form__input-field">
              <input type="text" id="special-instructions-text-field" class="mdc-text-field__input" name="specialInstructions" />
              <label class="mdc-floating-label" for="special-instructions-text-field">Special Instructons</label>
              <div class="mdc-line-ripple"></div>
            </div>

            <p class="mdc-typography--caption">How many do you want?</p>
            <input type="hidden" id="order_quantity" name="quantity" value="1"></input>
            <div class="mdc-chip-set mdc-chip-set--choice">
              <div class="order-chip mdc-chip mdc-chip--selected" tabindex="0" value="1">
                <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">person</i>
                <div class="mdc-chip__text">1</div>
              </div>
              <div class="order-chip mdc-chip" tabindex="-1" value="2">
                <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">people</i>
                <div class="mdc-chip__text">2</div>
              </div>
              <div class="order-chip mdc-chip" tabindex="-1" value="3">
                <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">person</i>
                <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">people</i>
                <div class="mdc-chip__text">3</div>
              </div>
              <div class="order-chip mdc-chip" tabindex="-1" value="4">
                <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">people</i>
                <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">people</i>
                <div class="mdc-chip__text">4</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = OrderForm;
