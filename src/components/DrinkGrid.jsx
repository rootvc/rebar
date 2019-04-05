const React = require('react')
const DrinkCard = require('./DrinkCard')

class DrinkGrid extends React.Component {
  constructor(props) {
    super(props)
    this.setState({})
  }
  
  render() {
    var drinkCards = []
    this.props.drinks.forEach((obj) => {
      drinkCards.push(<DrinkCard drink={obj} icon={this.props.icon} />)
    })

    return (
      <div class="mdc-layout-grid__inner">
        {drinkCards}
      </div>
    )
  }
}

module.exports = DrinkGrid
