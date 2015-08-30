  function myfunc(){
    var getJSON = function(url) {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
              resolve(xhr.response);
            } else {
            reject(status);
            }
        };
      xhr.send();
      });
    };
    var total;
  user=document.getElementById('git_user'); //get the user name from the entered text
  console.log(user.value);
  repo=document.getElementById('git_repo'); // get the repo name from the entered repo
  getJSON('https://api.github.com/repos/'+user.value+'/'+repo.value).then(function(data) {
    total=data.open_issues_count;
    result.innerText ='Total no of open issues are '+ data.open_issues_count; //display the result in an HTML element
  }, function(status) { //error detection....
    alert('Something went wrong.Maybe the following git user/repo does not exists');
    result.innerText='';
  });
getJSON('https://api.github.com/repos/'+user.value+'/'+repo.value+'/issues').then(function(data) {
   console.log(data);
   var size_1=0;
      size_7=0;
      size_8=0;
      var cnt=0;

   for(var key in data)
   {
    if(data.hasOwnProperty(key))  //loops through all objects 
    {
      if(data[key].state=='open')
      {
      date_t=data[key].updated_at;
      datem=date_t.split('T');  //date is in format of YYYY-MM-DDT00.00. So split and get the date
      date=datem[0]; //first value is the date
      console.log(date);
      a=date.split('-'); //date is in format YYYY-MM-DD so we need only DD so split
      b=a[2];console.log(b);
      var d = new Date(); //gets current time
      var n = d.getDate();//get current date
      if(n-b<1)
        size_1++;
      else if(n-b<8 && n-b>=1)
        size_7++;
      else size_8++;
      console.log(size_1,size_7,size_8);
      }
      
    }
   }size_8=total-size_1-size_7;
   document.getElementById("show").innerHTML="No of issues open in last 24 hours are "+size_1+"<br>"+" No of issues open in last 7 days are "+size_7+"<br>"+" No of issues open more than 7 days are"+size_8;

}, function(status) { //error detection....
  alert('Something went wrong.Maybe the following git user/repo does not exists');
  result.innerText='';
document.getElementById("show").innerHTML='';});
}
