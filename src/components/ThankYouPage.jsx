const React = require('react');

class ThankYouPage extends React.Component {
  constructor(props) {
    super(props)
    this.setState({})
  }
  
  render() {
    const style = {
      backgroundImage: 'url(' + this.props.drink.imageUrl + ')'
    }
    const homeUrl = "/?" + this.props.order.coasterId
    const confirmationText = this.props.order.quantity == 1
      ? `Your ${this.props.drink.name} will be out shortly.`
      : `Your order of ${this.props.quantity} ${this.props.drink.name}s will be out shortly.`
    
    return (
      <div class="mdc-card rebar-card thankyou-card">
        <div class="thankyou-card__text-label">Order received, {this.props.order.customerName || "Guest"}!</div>
        <div class="mdc-card__media mdc-card__media--square thankyou-image" style={style}></div>
        <div class="rebar-card__secondary">
          {confirmationText}
        </div>
        <div class="mdc-card__actions">
          <div class="mdc-card__action-buttons">
            <a href={homeUrl} class="mdc-button mdc-card__action mdc-card__action--button order-form__button">
              <i class="material-icons mdc-button__icon order-form__button-icon">local_drink</i>
              <span class="order-form__button-text">Order Another Drink</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ThankYouPage

