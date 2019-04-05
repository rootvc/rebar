const React = require('react')

const {MDCTabBar} = require('@material/tab-bar')

class TabBar extends React.Component {
  constructor(props) {
    super(props)
    this.setState({})
  }
  
  componentDidMount() {
    const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'))
    
    tabBar.listen('MDCTabBar:activated', (activatedEvent) => {
      document.querySelectorAll('.rebar-body').forEach((element, index) => {
        if (index === activatedEvent.detail.index) {
          element.classList.remove('rebar-body--hidden')
        } else {
          element.classList.add('rebar-body--hidden')
        }
      })
    })
  }
  
  render() {
    return (
      <div class="rebar-top-navigation">
        <div class="mdc-tab-bar" role="tablist">
          <div class="mdc-tab-scroller">
            <div class="mdc-tab-scroller__scroll-area">
              <div class="mdc-tab-scroller__scroll-content">

                <button class="mdc-tab mdc-tab--active rebar-tab" role="tab" aria-selected="true" tabindex="0">
                  <span class="mdc-tab__content">
                    <span class="mdc-tab__text-label">Coffee</span>
                  </span>
                  <span class="mdc-tab-indicator mdc-tab-indicator--active rebar-tab-indicator">
                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span class="mdc-tab__ripple"></span>
                </button>

                <button class="mdc-tab rebar-tab" role="tab" aria-selected="false" tabindex="-1">
                  <span class="mdc-tab__content">
                    <span class="mdc-tab__text-label">Cocktail</span>
                  </span>
                  <span class="mdc-tab-indicator rebar-tab-indicator">
                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span class="mdc-tab__ripple"></span>
                </button>

                <button class="mdc-tab rebar-tab" role="tab" aria-selected="false" tabindex="-1">
                  <span class="mdc-tab__content">
                    <span class="mdc-tab__text-label">Wine</span>
                  </span>
                  <span class="mdc-tab-indicator rebar-tab-indicator">
                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span class="mdc-tab__ripple"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = TabBar;
