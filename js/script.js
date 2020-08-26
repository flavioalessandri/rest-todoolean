
function getListData(){
  var target = $('#myList');
  $.ajax({

    url:"http://157.230.17.132:3000/todos",

    method: "GET",

    success: function (data){
      console.log("data",data);
      console.log(data.text);
      for (var i = 0; i < data.length; i++) {
        target.append(`<li data-id = "${data[i].id}"> ${data[i].text}</li>`);
      }
    },

    error: function (error){
      console.log("ERRORE", error);
    }

  })
}

function deleteDataOnClick(){
  $('#myList').on('click', 'li', deleteListData);
}

function insertDataOnClick(){
  $(document).on('click', '#btn', setListData);
}


function deleteListData(){
  console.log("CLICK" + $(this).data('id'));
}




function setListData(){

  var text = $('#input').val();
  $('#input').val("");


  console.log("text",text);

  $.ajax({
    url:"http://157.230.17.132:3000/todos",

    method: "POST",

    data:{
      text : text
    },

    success: function (data){
      console.log("data",data);
    },

    error: function (error){
      console.log("ERRORE", error);
    }

  })
}






function init(){
  console.log("Hello World");
  insertDataOnClick();
  deleteDataOnClick()
  getListData();
  // setListData();
}


$(document).ready(init);
