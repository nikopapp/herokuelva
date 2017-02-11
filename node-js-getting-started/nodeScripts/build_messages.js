var t = require("./test.js");

module.exports = {
  buildMessagesPage:buildMessagesPage,
  test:test
}

// This function is called every time a message is sent so
// that the messages page is updated. It finds every entry in the
// database and it populates the messages.html page.
function buildMessagesPage(db, fs){
  var rows;
  db.all("SELECT * FROM Message ORDER BY tstamp DESC",buildMessageError.bind(null, fs));
  function buildMessageError(fs, err, rows){
    if(err) console.log(err);
    if(!rows) throw err;
    else readMessageHTML(fs, rows);
  }

  //this function reads the message from the server
  function readMessageHTML(fs, rows){
    var file = "./admin/messages.html";
    var list = "";
    if(rows){
      var i = 0;
      rows.forEach(function (row) {
        var date = new Date(row.tstamp*1000);
        list = addListItem("#"+(rows.length-i++) + " user name: " + row.name, list, "details");
        list = addListItem(" email: "+ row.email, list, "details");
        list = addListItem(date, list, "details");
        list = addListItem(row.body, list, "message");
        list = addlineBreak(list);
      })
    fs.readFile(file,'utf8', writeMessageHTML.bind(null,fs,list));
  }
}

// This is the function that actually executes the writing to
// the messages.html file
function writeMessageHTML(fs, list, err, data){
  var fileOut = "./admin/messagestemp.html";
    data = data.replace(/replaceThis/g, list);
    fs.writeFileSync(fileOut,data);
    console.log("messages built");
    return;
  }
}

//this adds an item to the list
function addListItem(item, list, classId){
  list = list + "<li class='"+classId+"'>"+item+"</li>\n";
  return list;
}

// this adds the html linebreak to a list
function addlineBreak(list){
  return list +"<br/>";

}

function test(){
  t.check(addListItem("nikos","","details"),"<li class='details'>nikos</li>\n");
  t.check(addListItem("nikos","line\n","details"),"line\n<li class='details'>nikos</li>\n");
  t.check(addlineBreak(""), "<br/>");
  t.check(addlineBreak("line\n"), "line\n<br/>");
}
