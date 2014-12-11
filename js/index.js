var shopping_lemi0127 = {
    shoppingList: [],
    
    initialize: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function() {
        shopping_lemi0127.receivedEvent('deviceready');
        
    },
    
    receivedEvent: function(id) {
          
          if(localStorage.getItem("grocery-lemi0127")){
            shopping_lemi0127.shoppingList = JSON.parse(localStorage.getItem("grocery-lemi0127"));
            shopping_lemi0127.showList();
          }else{
            console.log("empty");
          }
         var btn= document.querySelector("#addItem");    
         btn.addEventListener("click", shopping_lemi0127.addItem );
         
    },
    
    addItem: function(ev){
                ev.preventDefault();
                
                var item = document.querySelector("#item").value;  
                if (item == null || item == "") {        
                    return false;
                }                
                shopping_lemi0127.shoppingList.push(item);                
                localStorage.setItem("grocery-lemi0127", JSON.stringify(shopping_lemi0127.shoppingList) );
                shopping_lemi0127.showList();
                $("input:text").val("");
                
                return false;

    },
    
    removeItem:function (ev){
                
                var txt = ev.currentTarget.parentNode.firstChild.nodeValue;        
                for(var i=0;i<shopping_lemi0127.shoppingList.length;i++){
                  if(shopping_lemi0127.shoppingList[i] == txt){
                      shopping_lemi0127.shoppingList.splice(i, 1);               
                      localStorage.removeItem(shopping_lemi0127.item);
                  }
                }
            localStorage.setItem("grocery-lemi0127", JSON.stringify(shopping_lemi0127.shoppingList) );
            shopping_lemi0127.showList();
 },
    
    markItem:function (ev){
        
            ev.preventDefault();
               
  
    var txt = this.firstChild.nodeValue;
    for(var i=0;i<shopping_lemi0127.shoppingList.length;i++){
                  if(shopping_lemi0127.shoppingList[i] == txt){
                      
             $(this).toggleClass("check"); 
             $("addedItems").listview();
                      $(".addedItems").listview('refresh');
            
                  }
                }
            localStorage.setItem("grocery-lemi0127", JSON.stringify(shopping_lemi0127.shoppingList) );
            shopping_lemi0127.showList();
 },
    
    showList: function(){            
                var list = document.querySelector("#addedItem");
                list.innerHTML = "";
            
            for(var i=0;i<shopping_lemi0127.shoppingList.length;i++){
                var remove = document.createElement("button");
                remove.setAttribute("class", "ui-btn ui-btn-inline ui-icon-minus ui-btn-icon-notext ui-corner-all ui-mini right");                      
                
                var item = document.createElement("li");
                item.setAttribute("class", "addedItems");
                item.innerHTML = shopping_lemi0127.shoppingList[i];    
                
                list.appendChild(item);
                item.appendChild(remove);
                
                $(list).listview('refresh');
                
                remove.addEventListener("click", shopping_lemi0127.removeItem);

                item.addEventListener("click", shopping_lemi0127.markItem);
          }       
    }
};

shopping_lemi0127.initialize();