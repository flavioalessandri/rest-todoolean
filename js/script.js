
function getData(){
  var target = $('#myList');
  $('#myList').text("");
  $.ajax({

    url:"http://157.230.17.132:3000/todos",

    method: "GET",

    success: function (data){
      console.log("data",data);
      console.log(data.text);
      for (var i = 0; i < data.length; i++) {
        target.append(`<li data-id = "${data[i].id}"> ${data[i].text}`);
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
  var id = $(this).data('id');
  console.log("CLICK" + $(this).data('id'));
  $.ajax({
    url: `http://157.230.17.132:3000/todos/${id}`,

    method: "DELETE",

    success: function (data){
      console.log("delete data", data);
      getData();
    },

    error: function(error){
      console.log("delete error",error);
    }

  })
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
      getData();

    },

    error: function (error){
      console.log("ERRORE", error);
    }

  })
}


function listDataHover(){
  var items = $('#myList li');
  $(document).on("mouseenter",'#myList li',function(){
      $(this).addClass('active');
  })
}

function listDataLeave(){
  var items = $('#myList li');
  $(document).on("mouseleave",'#myList li',function(){
    $(this).removeClass('active');
  })
}




function init(){
  insertDataOnClick();
  deleteDataOnClick();
  getData();

  listDataHover();
  listDataLeave();

}


$(document).ready(init);
