const postBtn = document.getElementById("post-btn");
const inputBar = document.getElementById("user-input");
let listEl = document.getElementById("list");
let exceptionMessage = "You cannot do nothing";

// Load items from localStorage on page load
const storedItems = JSON.parse(localStorage.getItem("items")) || [];
storedItems.forEach((itemText) => {
  createNewItem(itemText);
});

postBtn.addEventListener("click", () => {
  if (inputBar.value.trim() !== "") {
    const newItemText = inputBar.value;
    createNewItem(newItemText);

    // Save the updated items to localStorage
    updateLocalStorage();
  } else {
    alert(exceptionMessage);
  }
  inputBar.value = "";
});

listEl.addEventListener("click", function (event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("newItemClass")) {
    listEl.removeChild(clickedElement);

    // Remove the item from localStorage
    removeItemFromLocalStorage(clickedElement.textContent);
  }
});

function createNewItem(text) {
  const newItem = document.createElement("p");
  newItem.className = "newItemClass";
  newItem.textContent = text;
  listEl.appendChild(newItem);
}

function updateLocalStorage() {
  const items = Array.from(listEl.getElementsByClassName("newItemClass")).map(
    (item) => item.textContent
  );

  localStorage.setItem("items", JSON.stringify(items));
}

function removeItemFromLocalStorage(text) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const updatedItems = items.filter((item) => item !== text);
  localStorage.setItem("items", JSON.stringify(updatedItems));
}
