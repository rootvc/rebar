const React = require('react')
const DrinkGrid = require('./DrinkGrid')

class DrinkGridArray extends React.Component {
  constructor(props) {
    super(props)
    this.setState({})
  }
  
  render() {    
    const drinksByType = this.props.drinks.reduce(function(rv, x) {
      (rv[x['type']] = rv[x['type']] || []).push(x)
      return rv
    }, {})
          
    return (
      <div class="rebar--fixed-adjust">
        <div id="coffee-grid" class="rebar-coffee rebar-body mdc-layout-grid">
          <DrinkGrid drinks={drinksByType.coffee} icon="local_cafe"/>
        </div>
        <div id="soft-drinks-grid" class="rebar-soft-drinks rebar-body mdc-layout-grid rebar-body--hidden">
          <DrinkGrid drinks={drinksByType["soft drink"]} icon="wifi"/>
        </div>
        <div id="cocktails-grid" class="rebar-cocktail rebar-body mdc-layout-grid rebar-body--hidden">
          <DrinkGrid drinks={drinksByType.cocktail} icon="local_bar"/>
        </div>
        <div id="wine-grid" class="rebar-wine rebar-body mdc-layout-grid rebar-body--hidden">
          <DrinkGrid drinks={drinksByType.wine} icon="local_bar"/>
        </div>
        <div id="beer-grid" class="rebar-beer rebar-body mdc-layout-grid rebar-body--hidden">
          <DrinkGrid drinks={drinksByType.beer} icon="wifi"/>
        </div>
      </div>
    )
  }
}

module.exports = DrinkGridArray
