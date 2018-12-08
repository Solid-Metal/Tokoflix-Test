if (localStorage.getItem("user") == null) {
  localStorage.setItem("user", "newUser");
  localStorage.setItem("money", 100000);
  let list = [];
  list[0] = "initialItem";
  localStorage.setItem("itemList", JSON.stringify(list));
} else {
}

const user = {
  checkItem: function(id) {
    let listItem = JSON.parse(localStorage.getItem("itemList"));
    for (let data of listItem) {
      if (data === id) {
        return "own";
      }
    }
    return "nope";
  },

  buyMovie: function(id, price) {
    if (localStorage.getItem("money") < price) {
      return "Insufficient Fund";
    } else {
      let listItem = JSON.parse(localStorage.getItem("itemList"));
      listItem.push(id);
      localStorage.setItem("itemList", JSON.stringify(listItem));

      let money = localStorage.getItem("money");
      money -= price;
      localStorage.setItem("money", money);
      return 'ok';
    }
  }
};

export default user;
