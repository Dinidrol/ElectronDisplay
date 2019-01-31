

var arr = [];
var tik = 0;
var tik1 = 0;

// socket.on('display', function (data) {
//   console.log(data.data);
//   const text = data.data
//   arr[tik] = data.data;
//     tik++;
//     if(tik >=4){ tik = 0;}
//   const e = arr.length;
//     tik1 = e;

//   console.log(tik1);
//   console.log(tik);
//   update();       
// });


// socket.on('time',function(data){
//   //console.log(data.data);
//   const time = data.data;
//   change_time(time);
// });

// socket.on('touch', function(data){
//     const touc = data.data;
//     touchText(touc);
// });

// socket.on('reload', function(data){
  
//   if(data.data == 1){
//     console.log(data.data);
//     document.location.reload(true);
//   }
// });

// function touchText(data){
//   if(data == 'false'){
    
//     console.log(tik1);
//     if(tik1 == 1){
//       change_li('li1');
//       change_text(arr[tik1-1]);
//       tik1 = 0;
//       arr = [];
//     }
//     if(tik1 == 2){
//       change_li('li2');
//       change_text(arr[tik1-1]);
//       tik1 --;
//     }
//     if(tik1 == 3){
//       change_li('li3');
//       change_text(arr[tik1-1]);
//       tik1 --;
//     }
//     if(tik1 == 4){
//       change_li('li4');
//       change_text(arr[tik1-1]);
//       tik1 --;
//     }
//   }
// }

// function update(){
	
  
// 	//console.log('Send all' +e);
//     if(tik1 == 1){
//     	change_li1('li1');
//     }
//     if(tik1 == 2){
//       change_li1('li1');
//     	change_li1('li2');
//     }
//     if(tik1 == 3){
//       change_li1('li1');
//       change_li1('li2');
//     	change_li1('li3');
//     }
//     if(tik1 == 4){
//       change_li1('li1');
//       change_li1('li2');
//       change_li1('li3');
//     	change_li1('li4');
//     }
  
// }

function change_time(data){
	document.getElementById('time').innerHTML = data;
}

function change_text(data){
	document.getElementById('textares').innerHTML = data;
}

function change_li(data) {
   const myEl = document.getElementById(data);
   myEl.style.opacity = '0.5';	
}

function change_li1(data){
	const myEl = document.getElementById(data);
	myEl.style.opacity = '1';

}
 