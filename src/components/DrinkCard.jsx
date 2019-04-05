const React = require('react')

class DrinkCard extends React.Component {
  constructor(props) {
    super(props)
    this.setState({})    
  }
  
  render() {
    const style = {
      backgroundImage: 'url(' + this.props.drink.imageUrl + ')'
    }
    return (
      <div class="mdc-layout-grid__cell">
        <div class="mdc-card mdc-card--outlined rebar-card" id={this.props.drink.id}>
          <div class="rebar-image mdc-card__media mdc-card__media--square" style={style}></div>
          <div class="rebar-card__text-label">{this.props.drink.name}</div>
          <div class="rebar-card__secondary mdc-typography--body2">{this.props.drink.description}</div>
          <div class="mdc-card__actions">
            <div class="mdc-card__action-buttons">
              <button class="mdc-button mdc-card__action mdc-card__action--button order-form__button">
                <i class="material-icons mdc-button__icon order-form__button-icon">{this.props.icon}</i>
                <span class="order-form__button-text">Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = DrinkCard
