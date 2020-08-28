
// new function ---------------------------------
const getListItems = () => {
  return axios.get("http://157.230.17.132:3000/todos")
    .then(response => {if (response.status == 200) {return response.data;}})
    .catch(reject => console.log("reject getListItems",reject));
}

// new function ---------------------------------
const setListItemsPost = (text) => {return axios.post("http://157.230.17.132:3000/todos",{text: text})
      .then(response => { console.log("setListItemsPost response", response)})
      .catch(reject => console.log("reject setListItemsPost",reject));
}

// new function ---------------------------------
const printListItems = () =>{
  var target = document.getElementById('myList');

  return axios.get("http://157.230.17.132:3000/todos")
  .then(response => {
  if (response.status == 200) {

    for (var i = 0; i < response.data.length; i++) {
      let li = document.createElement("li");
      li.setAttribute('data-id' , `${response.data[i].id}`);
      li.appendChild(document.createTextNode(`${response.data[i].text}`));
      target.append(li);
      }
    }
  })
  .catch(reject => console.log("reject getListItems",reject));
}

// new function ---------------------------------
const insertNewListItems = (btn) => {
  btn.addEventListener("click", () =>{

const text = document.getElementById('input').value;

  document.getElementById('input').value="";
  document.getElementById('myList').innerHTML="";

  setListItemsPost(text)
    .then(printListItems);
  });
}

// new function ---------------------------------
const removeListItemsOnClick = (ul) => {
  ul.addEventListener("click", (e) =>{

  let id = e.target.getAttribute('data-id');
  document.getElementById('myList').innerHTML="";
  console.log("target",e.target);
  console.log("id",id);

  deleteListItems(id)
    .then(printListItems);
});
}

// new function ---------------------------------
const deleteListItems = (id) => { return axios.delete(`http://157.230.17.132:3000/todos/${id}`)
    .then(response => {console.log("deleteListItems status: ", response.status);})
    .catch(reject => console.log("deleteListItems reject: ",reject));
}

// main function ---------------------------------
const init = () => {

  getListItems()
  .then(printListItems);

  const btn = document.getElementById('btn');
  const ul = document.getElementById('myList');

  insertNewListItems(btn);
  removeListItemsOnClick(ul);

  ul.addEventListener('mouseover', (e) => {
    let thisElem = e.target;
      if (thisElem.getAttribute('data-id')) {
          thisElem.classList.add("active");
        }
  });

  ul.addEventListener('mouseout', (e) => {
    let thisElem = e.target;
      if (thisElem.getAttribute('data-id')) {
          thisElem.classList.remove("active");
      }
  });
  }

  document.addEventListener("load", init());
