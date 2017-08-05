# In Season Right Now


## Fetch data from BBC Good Food

```javascript
var tableNode = document.querySelector('table');
var rowsNode = tableNode.querySelectorAll('tbody tr');

var rows = [];
for (var i = 0; i < rowsNode.length; i++) {
  var row = rowsNode[i];

  var cellsNode = row.querySelectorAll('td');
  var cells = [];
  for (var j = 0; j < cellsNode.length; j++) {
    var cell = cellsNode[j].innerText;
    cells.push(cell);
  }
  rows.push(cells);
}
```
