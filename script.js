// function for fetching JSON data

async function getMenu(){
    try{
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const menuItems = await response.json();
        displayMenuItems(menuItems);
    }catch(error){
        console.error('Error fetching Menu: ',error);
    }
}

// funtion for displaying menuItems in card

function displayMenuItems(menuItems){
    const container = document.getElementsByClassName('menu')[0];

    menuItems.forEach(item=>{
        const card = document.createElement('div');
        card.className = "card";
        card.innerHTML=`
        <img class=item src="${item.imgSrc}" alt="${item.name}">
        <div class="card-bottom">
            <div>
                <h3>${item.name}</h3>
                <p>${item.price.toFixed(2)}/-</p>
            </div>
            <div>
            <img class=abc src="./images/Group 4.svg" alt="add">
            </div>
        </div>
        `;
        container.appendChild(card);
    });
}

// function for selecting random items from menu

function selectRandomItems(menuItems,count){
    const randomItems= [];
    while(randomItems.length<count){
        const randomIndex = Math.floor(Math.random()*menuItems.length);
        randomItems.push(menuItems[randomIndex]);
    }
    return randomItems;
}

// function to taking order

function takeOrder(){
    return new Promise(resolve =>{
        setTimeout(() =>{
                fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
                .then(response => response.json())
                .then(menuItems=>{
                    const randomMenuItems = selectRandomItems(menuItems,3);
                    const order = {items : randomMenuItems};
                    resolve(order);
                })
                .catch(error=>{
                    console.error('Error fetching menu for order:',error);
                    resolve(null);
                });
                
        },2500);
    });
}

// function for order preparation

function orderPrep(){
    return new Promise (resolve =>{
        setTimeout(()=>{
            resolve({order_staus: true, paid:false});
        },1500);
    });
}

// function for order payment

function payOrder(){
    return new Promise (resolve =>{
        setTimeout(()=>{
            resolve({order_staus: true, paid:true});
        },1000);
    });
}

// Thankyou function

function thankyouFnc(){
    alert('Thank you for eating with us today!');
}

// function to run restraunt

async function Restraunt(){
    await getMenu();
    const order = await takeOrder();
    console.log('Order: ',order);
    const prepStatus = await orderPrep();
    console.log('Preparation status: ',prepStatus);
    const paymentStatus = await payOrder();
    console.log('Payment status', paymentStatus);
    if(paymentStatus.paid){
        thankyouFnc();
    }
}

Restraunt();

