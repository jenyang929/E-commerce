import React from 'react';
import './App.css';
import Receipt from './Receipt';

const allBrands = [
  { id: 1, name: 'West Elm' },
  { id: 2, name: 'Restoration Hardware' },
  { id: 3, name: 'CB2' },
  { id: 4, name: 'JoyBird' },
  { id: 5, name: 'Article' },
  { id: 6, name: 'Design Within Reach' },
  { id: 7, name: 'Pottery Barn' },
  { id: 8, name: 'Ikea' },
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      purchased: [],
      isChecked: new Array(allBrands.length).fill(false),
      comment: '',
    };
  }

  // toggles selected brands
  handleSelect = brandIdx => {
    this.setState({
      isChecked: this.state.isChecked.map((el, idx) => {
        if (idx === brandIdx) {
          return (el = !el);
        }
        return el;
      }),
    });
  };

  // adds checked items to purchased
  addToPurchased = purchasing => {
    if (this.state.comment && purchasing.length) {
      this.setComment(false);
    }

    const hash = [];
    purchasing.map(brand => {
      return hash.push(brand.name);
    });

    this.setState({ purchased: [...this.state.purchased, [...hash]] });
    this.resetIsChecked();
  };

  // sets state for any errors or additional comments
  setComment = bool => {
    if (bool === true) {
      this.setState({ comment: 'Oh no! there is nothing to be purchased!' });
    } else {
      this.setState({ comment: '' });
    }
  };

  // checks for any checked brands to be purchased
  submitPurchase = () => {
    const { isChecked } = this.state;
    const purchasing = [];
    isChecked.forEach((el, idx) => {
      if (el === true) {
        purchasing.push(allBrands[idx]);
      }
    });

    if (!purchasing.length) {
      this.setComment(true);
    } else {
      this.addToPurchased(purchasing);
    }
  };

  // Clears out and resets checkbox after purchasing
  resetIsChecked = () => {
    this.setState({ isChecked: new Array(allBrands.length).fill(false) });
  };

  render() {
    const { handleSelect, submitPurchase } = this;
    const { isChecked, purchased, comment } = this.state;

    return (
      <div className="App">
        <header className="App-header">E-commerce</header>
        <div className="column-container">
          <div className="column">
            <h2>Brands</h2>
            {allBrands?.map((brand, idx) => {
              return (
                <div className="inputs">
                  <input
                    type="checkbox"
                    id={brand.id}
                    name={brand.name}
                    value={isChecked[idx]}
                    checked={isChecked[idx]}
                    onClick={() => handleSelect(idx)}
                  />
                  <label>{brand.name}</label>
                </div>
              );
            })}
            <button onClick={submitPurchase}>Purchase!</button>
          </div>
          <div className="column">
            <header>Purchased!</header>
            <div>{purchased && <Receipt purchased={purchased} />}</div>
          </div>
          <div className="column">
            <header>Comments!</header>
            <div>{comment}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
