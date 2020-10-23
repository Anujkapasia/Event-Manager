var today = new Date().toISOString().split('T')[0];
document.getElementsByName("dates")[0].setAttribute('min', today);
var allEvents=[];


if ('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('./sw.js')
            .then((reg)=> console.log('Success: ', reg.scope))
            .catch((err)=> console.log('Faliure: ', err))
    })
}

var allSlots=[
    {name:'slot1',value:'10:00-10:30 AM'},
    {name:'slot2',value:'10:30-11:00 AM'},
    {name:'slot3',value:'11:00-11:30 AM'},
    {name:'slot4',value:'11:30-12:00 PM'},
    {name:'slot5',value:'12:00-12:30 PM'},
    {name:'slot6',value:'12:30-1:00 PM'},
    {name:'slot7',value:'2:30-3:00 PM'},
    {name:'slot8',value:'3:00-3:30 PM'},
    {name:'slot9',value:'3:30-4:00 PM'},
    {name:'slot10',value:'4:00-4:30 PM'},
    {name:'slot11',value:'4:30-5:00 PM'},
    {name:'slot12',value:'5:00-5:30 PM'},
    
]

if(document.cookie!==""){
    allEvents=JSON.parse(document.cookie.split("=")[1])
    document.getElementById("all-events-container").innerHTML = allEvents.map((event)=>{
        return(
            `
            <div class="event-container" >
                <div class="event-head ${event.type.toLowerCase()}" >
                    <div class="event-name" >${event.name}</div>
                    <span class="event-type" >${event.type}</span>
                </div>
                <div class="event-description" >${event.description}</div>
                    <div class="event-timing-container" >
                        <span class="event-date" >${event.date}</span>
                        <span class="event-slot" >${event.slot}</span>
                    </div>
                </div>
            </div>
            `
        )
    })
    
}else{
    document.getElementById("all-events-container").innerHTML="You have no scheduled events."
}


dateCheck=()=>{
    todayEvents = allEvents.filter((event)=>event.date===document.getElementById("event-date-input").value);
    todayEvents.forEach(element => {
        allSlots.forEach(slot=>{
            if(slot.value===element.slot){
                document.getElementById(slot.name).classList.add('disabled')
            }else{
                document.getElementById(slot.name).classList.add('enabled')
            }
        })
    });
}






submitNewEvent = () =>{
    let prevEvents=allEvents;
    let newEventName=document.getElementById("create-event-input").value;
    let newEventDescription=document.getElementById("create-event-textarea").value;
    let newEventDate = document.getElementById("event-date-input").value;
    let newEventSlot  = document.getElementById("selected-slot").innerHTML;
    let newEventType = document.getElementById("selected-type").innerHTML;
    if (newEventSlot!=="Select Slot"&& newEventName!=="" && newEventDate!==""){
        let newObj = Object.assign({
            name:newEventName,
            description:newEventDescription,
            date:newEventDate,
            slot:newEventSlot,
            type:newEventType
        })
        prevEvents.push(newObj)
        document.cookie = `allEvents = ${JSON.stringify(prevEvents)}`;
        document.getElementById("create-event-container").style.opacity = 0;
        document.getElementById("create-event-container").style.pointerEvents = "none";
    }
}

cancelNewEvent = ()=>{
    document.getElementById("create-event-container").style.opacity = 0;
    document.getElementById("create-event-container").style.pointerEvents = "none";
    document.getElementById("create-event-input").value = "";
    document.getElementById("create-event-textarea").value = "";
    document.getElementById("event-date-input").value = "";
    document.getElementById("selected-slot").innerHTML = "Select Slot";
}

showAllTypes=()=>{
    document.getElementById("event-types").style.opacity="1"
    document.getElementById("event-types").style.pointerEvents="all"
}

showAvailableSlots=()=>{
    document.getElementById("available-slots").style.opacity="1"
    document.getElementById("available-slots").style.pointerEvents="all"
}

selectSlot=(value)=>{
    document.getElementById("selected-slot").innerHTML = value;
    document.getElementById("available-slots").style.opacity="0"
    document.getElementById("available-slots").style.pointerEvents="none"

}

selectType=(value)=>{
    document.getElementById("selected-type").innerHTML = value;
    document.getElementById("event-types").style.opacity="0";
    document.getElementById("event-types").style.pointerEvents="none"
    
}

createNewEvent=()=>{
    document.getElementById("create-event-container").style.opacity = 1;
    document.getElementById("create-event-container").style.pointerEvents = "all";
    
}

