import  { Component } from "react";
import foodData from "../Components/resources/FoodData";

class Nutrition extends Component {
  state = {
    foodItems: foodData.map((food) => ({
      id: food.id,
      quantity: 0,
      totalCalories: 0,
    })),
    searchTerm: "",
  };

  handleQuantityChange = (id, quantity) => {
    this.setState((prevState) => ({
      foodItems: prevState.foodItems.map((foodItem) =>
        foodItem.id === id
          ? { ...foodItem, quantity: Math.max(quantity, 0) }
          : foodItem
      ),
    }));
  };

  handlePlusClick = (id) => {
    this.setState((prevState) => ({
      foodItems: prevState.foodItems.map((foodItem) =>
        foodItem.id === id
          ? {
              ...foodItem,
              totalCalories:
                foodItem.quantity * foodData.find((food) => food.id === id).cal,
            }
          : foodItem
      ),
    }));
  };

  handleResetClick = (id) => {
    this.setState((prevState) => ({
      foodItems: prevState.foodItems.map((foodItem) =>
        foodItem.id === id
          ? { ...foodItem, quantity: 0, totalCalories: 0 }
          : foodItem
      ),
    }));
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { foodItems, searchTerm } = this.state;

    const filteredFoodItems = foodItems.filter((foodItem) =>
      foodData
        .find((food) => food.id === foodItem.id)
        .name.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    return (
      <div className="box">
        <div className="search-container">
          <p>Search</p>
          <input
            type="text"
            placeholder="Search foods"
            value={searchTerm}
            onChange={this.handleSearchChange}
          />
        </div>
        <div>
          {filteredFoodItems.map((foodItem) => {
            const { id, quantity, totalCalories } = foodItem;
            const { name, cal, img } = foodData.find((food) => food.id === id);

            return (
              <div key={id}>
                <div style={{ display: "flex" }}>
                  <div className="food-container">
                    <img src={img} alt={name} />
                    <div>
                      <p>{name}</p>
                      <p>{cal} calories</p>
                    </div>
                    <div>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          this.handleQuantityChange(
                            id,
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                      <button onClick={() => this.handlePlusClick(id)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="total-calories-container">
                    <p>
                      {quantity} {name} = {totalCalories} calories
                    </p>
                    <button onClick={() => this.handleResetClick(id)}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Nutrition;
