/* eslint-env browser */

/**
 * Disclaimer: this app is a simplistic example for showcasing basic DOM manipulation.
 * It purposefully ignores any abstractions, design patterns, conventions etc. with the sole
 * purpose of making the code as simple as possible for novices, while focusing exclusively on
 * basic DOM manipulation. It is *not* a good example of how a todo-style app should be written!
 */
(function () {
  // Store a reference to the form responsible for adding new items to the list
  const newItemForm = document.getElementById('newItemForm');

  // Store a reference to the input that holds the text value
  // representing the new shopping list item
  const itemInput = document.getElementById('newItemInput');

  // Store a reference to the list element that contains all shopping items
  const shoppingList = document.getElementById('shoppingList');

  // Each time the form is submitted, instead of refreshing the window,
  // create a new shopping list item
  newItemForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent redirection / page refresh
    addItem(itemInput.value);
  });

  // Store a reference to the button responsible for removing all shopping
  // list elements from the shopping list
  const deleteAllBtn = document.getElementById('deleteAllBtn');

  // On each click, empty the list
  deleteAllBtn.addEventListener('click', function (event) {
    shoppingList.innerHTML = '';
  });

  /**
   * Calls the appropriate compilation functions to create a new shopping list
   * element and all it's childern, then appends it to the shopping list
   * <li> element to the UI
   * @param {String} itemText : the value of itemInput (see above)
   */
  function addItem(itemText) {
    const listItem = compileListItem();
    const statusCheckbox = compileStatusCheckbox();
    const deleteButton = compileDeleteButton();
    const itemTextInput = compileItemTextInput();

    itemTextInput.value = itemText;

    listItem.appendChild(statusCheckbox);
    listItem.appendChild(itemTextInput);
    listItem.appendChild(deleteButton);

    shoppingList.appendChild(listItem);
  }

  /**
   * Create a new <li> element with the appropriate classes and attributes,
   * that will represent a shopping list item
   * @return {HTMLLiElement}
   */
  function compileListItem() {
    const listItem = document.createElement('li');
    listItem.className = 'shopping-list-item';
    return listItem;
  }

  /**
   * Create a new <input> element of type 'checkbox'. This checkbox will control
   * the shopping list item status, i.e. whether it has been 'completed' or not.
   * @return {HTMLInputElement}
   */
  function compileStatusCheckbox() {
    const statusCheckbox = document.createElement('input');
    statusCheckbox.type = 'checkbox';
    statusCheckbox.className = 'item-status-checkbox';

    // When the button is checked, the shopping list item is considered to be 'done'.
    // Add a 'disabled' attribute on the text input to indicate this status.
    statusCheckbox.addEventListener('change', function () {
      this.parentElement.querySelector('[data-item-text]').disabled = this.checked;
    });

    return statusCheckbox;
  }

  /**
   * Create a new <input> element of type 'text'. This element holds the text
   * of the shopping list item, e.g. 'Potatoes' or 'Milk' etc.
   * @return {HTMLInputElement}
   */
  function compileItemTextInput() {
    const itemTextInput = document.createElement('input');
    itemTextInput.className = 'item-text form-control'; // form-control is a Bootstrap class
    itemTextInput.type = 'text';

    // Add a data attribute to easily reference textInput element.
    // Use 'true' as a default value - the value is irrelevant here,
    // we just want the data attribute to be present on the element
    itemTextInput.dataset.itemText = true;

    return itemTextInput;
  }

  /**
   * Create a new <button> element that will be used for removing items
   * from the shopping list.
   * @return {HTMLButtonElement}
   */
  function compileDeleteButton() {
    const deleteItemButton = document.createElement('button');
    deleteItemButton.className = 'btn-delete-item close text-danger'; // 'close' is a Bootstrap class

    const buttonIcon = document.createElement('span'); // create a child element for the 'x' icon
    buttonIcon.innerHTML = '&times;';

    deleteItemButton.appendChild(buttonIcon);

    // add an event listener to the button: when clicked, the button's parent element
    // (in our case, the <li> element representing the shopping list item), will be deleted
    deleteItemButton.addEventListener('click', function () {
      this.parentElement.remove();
    });

    console.log('Message from Kosmas');

    return deleteItemButton;
  }
}());
