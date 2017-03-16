/**
 * Created by Lukasz on 13.07.16.
 */

$(document).ready(function(){
    
    
   var board=[];
    var x=8;
    var y=8;
    var bombs=6;
    var fields=x*y;
    
   
    create(x,y);
   
    mouseDim();
    
    
    
    function mouseDim()
    {
        var cursorX,cursorY;
        
        document.addEventListener("click",function(e){
        
        
            
        cursorX = e.pageX-10;
        cursorY = e.pageY;-10;
            
       
            
       var result=board[Math.floor(cursorY/40)][Math.floor(cursorX/40)];
            
         
    
            
        //
            //alert(Math.floor(cursorX/40)+" "+ Math.floor(cursorY/40));
        var resultX=Math.floor(cursorX/40);
        var resultY=Math.floor(cursorY/40);
            
             if(!$("#"+resultY+resultX).hasClass("field-shown")){
               
                  fields--;
            
                   // console.log(fields);
                 
                 
             }
            
            
            
           
            
            if(fields===6){
                alert("wygrana");
            }
            
            
        $("#"+resultY+resultX).removeClass("field-hide");
        $("#"+resultY+resultX).addClass("field-shown");
        $("#"+resultY+resultX).html(board[resultY][resultX]);

      
          //fillFlood(resultX,resultY);
         // fillUp(resultX,resultY);
           fillDown(resultX,resultY);
          // edges();
        
            
            
            if(result==-1){
                alert("przegrana");
                create(x,y);
            }
            
            
      //  drawBoard(x,y);
           
    
        })
        
 }
    
    var field=function(id,x,y){
        
       this.id=id;
       this.x=x;
       this.y=y;
        
        
    }



var ddd=0;


function fillDown(x, y) {

    // get target value
    var target = 0;
    // maintain list of cells to process
    // put the starting cell in the queue
    var queue = [{x:x, y:y}], item;
    
    while (queue.length) {
     // console.log(ddd++);
        item = queue.shift();
        x = item.x;
        y = item.y;

        if (board[y][x] === target) {
              board[y][x]=target;
              $("#"+y+x).html(0);
              $("#"+y+x).removeClass("field-hide");
              $("#"+y+x).addClass("field-shown");
         

                queue.push({x:x-1, y:y});
                queue.push({x:x-1, y:y+1});
        // 
              
                queue.push({x:x+1, y:y+1});
                queue.push({x:x, y:y+1});
            

           
                queue.push({x:x+1, y:y});
                queue.push({x:x+1, y:y-1})
            
          
                queue.push({x:x, y:y-1});
                queue.push({x:x-1, y:y-1});
            
        }
    } 
}


function edges(){
  for(var i=0;i<=7;i++){

    for(var j=0;j<=7;j++){



        if(board[j][i]==-11){
           console.log(ddd++);

                  if(board[j+1][i]>0){
                    $("#"+j+1+i).removeClass("field-hide");
                    $("#"+j+1+i).addClass("field-shown");
                    $("#"+j+1+i).html(board[j+1][i]);
                  }
                    if(board[j][i+1]>0){
                       $("#"+j+i+1).removeClass("field-hide");
                        $("#"+j+i+1).addClass("field-shown");
                        $("#"+j+i+1).html(board[j][i+1]);
                  }
                      if(board[j-1][i]>0){
                       $("#"+j+i-1).removeClass("field-hide");
                        $("#"+j+i-1).addClass("field-shown");
                        $("#"+j-1+i).html(board[j-1][i]);
                  }
                        if(board[j][i-1]>0){
                       $("#"+j+i).removeClass("field-hide");
                        $("#"+j+i).addClass("field-shown");
                        $("#"+j+i).html(board[j][i-1]);
                  }
                          if(board[j+1][i+1]>0){
                       $("#"+j+i).removeClass("field-hide");
                        $("#"+j+i).addClass("field-shown");
                        $("#"+j+i).html(board[j+1][i+1]);
                  }
                            if(board[j-1][i-1]>0){
                       $("#"+j+i).removeClass("field-hide");
                        $("#"+j+i).addClass("field-shown");
                        $("#"+j+i).html(board[j-1][i-1]);
                  }
                              if(board[j+1][i-1]>0){
                       $("#"+j+i).removeClass("field-hide");
                        $("#"+j+i).addClass("field-shown");
                        $("#"+j+i).html(board[j+1][i-1]);
                  }
                                if(board[j-1][i+1]>0){
                       $("#"+j+i).removeClass("field-hide");
                        $("#"+j+i).addClass("field-shown");
                        $("#"+j+i).html(board[j-1][i+1]);
                  }
                }
            }
          }

 }
    


    
function plantBomb(num,x,y)
    {
        
        for(var i=0;i<num;i++){
            
            var x=Math.floor((Math.random()*8));
            var y=Math.floor((Math.random()*8));
            if(board[x][y]!=-1){
                  board[x][y]=-1;
                  calculateNumbers(x,y);
            }else{
                i--;
            }
           
        }
        
        
    }
    
    
    function calculateNumbers(x,y){
        
        if( x>0 && board[x-1][y]!=-1 ){
            
              board[x-1][y]+=1;
            
        }
        
         if( x<7 && board[x+1][y]!=-1 ){
            
              board[x+1][y]+=1;
            
        }
        
        if( y>0 && board[x][y-1]!=-1 ){
            
              board[x][y-1]+=1;
            
        }
        
        
        if( y<7){
            
              board[x][y+1]+=1;
            
        }
        
        if( x>0 && y>0 && board[x-1][y-1]!=-1 ){
              board[x-1][y-1]+=1;
        }
        
        
        
        if( x<7 && y>0 && board[x+1][y-1]!=-1 ){
              board[x+1][y-1]+=1;
        }
        
        
        if( x>0 && y<7 && board[x-1][y+1]!=-1 ){
              board[x-1][y+1]+=1;
        }
        
        if( x<7 && y<7 && board[x+1][y+1]!=-1 ){
              board[x+1][y+1]+=1;
        }
            
      
      
       
        
    }
    
    
    function create(x,y){
        
                board=[];
                
                fields=x*y;
        
                for(var i=0;i<y;i++){
                
                board[i]=[];

                    for(var j=0;j<x;j++){
                        
                     //   board[i][j]=Math.floor((Math.random()*4)+1);
                        
                        board[i][j]=0;
                        //board[i][j]
                        
                     }
                }
        
         plantBomb(bombs,x,y);
       
         drawBoard(x,y);
    };
    
    
    function drawBoard(x,y){
            
   
            
            var boardElement=$("#board");
            boardElement.empty();
        
       

            for(var i=0;i<y;i++){
                
                 boardElement.append("<div class='clear'/>");
              
               
                for(var j=0;j<x;j++){
                    
                      boardElement.append("<div id='"+i+j+"'class='field-hide'><p></p></div>");
                  /* 
                    if(board[i][j]===-1){
                        boardElement.append("<div id='"+i+j+"'class='field-bomb'><p></p></div>");
                    }
                    else if(board[i][j]>0){
                        
                         boardElement.append("<div id='"+i+j+"'class='field-shown'><p>"+board[i][j]+"</p></div>");
                        
                    }
                    else{
                        
                         boardElement.append("<div id='"+i+j+"'class='field-shown'><p></p></div>");
                    }
                    */
                   
                    
                }
                    
                
            }
        };
    
    
   
    
});




