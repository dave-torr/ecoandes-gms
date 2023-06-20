import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from "next-auth/react"


import { Select } from '@mantine/core';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircularProgress from '@mui/material/CircularProgress';

import Switch from '@mui/material/Switch';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { aDropdownPicker, anInputDisplayer} from "../components/forms"
import {GMSNavii} from "./../components/navis"

import LTCPriceTables from "../data/LTCPriceTables2023.json"

import styles from "./../styles/pages/playground.module.css"


let catalogIndex={
    "adventureGuides":"Adventure Guides",
    "driverGuideServices":"Driver Guides",
    "nativeGuides":"Native Guides",
    "guideServices":"Guide Services",
    "galapagosVarCosts":"Galapagos Variable Costs",
    "galapagosCharterCosts":"Galapagos Charters",
    "galapagosDayTours":"Galapagos Day Tours",
    "galapagosDiving":"Galapagos Diving Tours",
    "maexgal":"Galapagos Luxury Island Hopping",
    "continentalVarCosts":"Continental Variable Costs",
    "ikalaHotels":"Accomodation Ikala Hotel Properties"
}

const sampleDeparture={
    "itineraryID": "quacks",
    "tourCode":"EC AE 12 23 / GE 47 23",
    "roomingList": [
        {
        "guest":{
            "guestName": "Yeti Dicho",
            "guestDOB": "10/28/1992",
            "guestID": String,
            "guestNotes": [
                "Alergic to Peanuts",
                "Vegetarian"
            ],
            "passport": "A256824",
            "nationality": "Tibet",
            "sex":"male"
        },
        "guest2":{
            "guestName": "Mrs. Snow",
            "guestDOB": "10/27/93",
            "guestID": String,
            "passport": "A256824",
            "nationality": "Tibet",
            "sex":"female"
        },
        "accomodationType": "matrimonial",
        "singleSupp": false,
        },
        {
        "guest":{
            "guestName": "Yeti Michu",
            "guestDOB": "10/7/1992",
            "guestID": String,
            "guestNotes": [
                "Alergic to Peanuts",
                "Vegetarian"
            ],
            "passport": "A256824",
            "nationality": "Tibet",
        },
        "guest2":{
            "guestName": "Mrs. Icicle",
            "guestDOB": "6/9/93",
            "guestID": String,
            "guestNotes": [
                "werewolf"
            ],
            "passport": "A256824",
            "nationality": "Tibet",
        },
        "accomodationType": "matrimonial",
        "singleSupp": false,
        },
        {
        "guest":{
            "guestName": "Hegi Segara",
            "guestDOB": "6/5/1942",
            "guestID": String,
            "guestNotes": [
                "Alergic to Shrimp",
            ],
            "passport": "A256824",
            "nationality": "Tibet",
        },
        "guest2":{
            "guestName": "Majorne Kepecz",
            "guestDOB": "6/7/95",
            "guestID": String,
            "guestNotes": [
                "Gluten free"
            ],
            "passport": "A256824",
            "nationality": "Tibet",
        },
        "accomodationType": "twin",
        "singleSupp": false,
        },
        {
        "guest":{
            "guestName": "Hegi Segara",
            "guestDOB": "6/5/1942",
            "guestID": String,
            "passport": "A256824",
            "nationality": "Tibet",
        },
        "guest2":{
            "guestName": "Majorne Kepecz",
            "guestDOB": "6/7/95",
            "guestID": String,
            "guestNotes": [
            "Gluten free"
            ],
            "passport": "A256824",
            "nationality": "Tibet",
        },
        "guest3":{
            "guestName": "Third Guest",
            "guestDOB": "6/7/98",
            "guestID": String,
            "guestNotes": [
            "Gluten free"
            ],
            "passport": "A2664",
            "nationality": "Malaysia",
        },
        "accomodationType": "triple",
        "singleSupp": false,
        },
        {
        "guest":{
            "guestName": "Mr.Bear Donoso",
            "guestDOB": "8/15/1972",
            "guestID": String,
            "guestNotes": [
                "Alergic to Peanuts",
                "Vegetarian"
            ],
            "passport": "A256824",
            "nationality": "Nepal",
        },
        "singleSupp": true,
        },
        {
        "guest":{
            "guestName": "Tiger Ton",
            "guestDOB": "8/15/1978",
            "guestID": String,
            "guestNotes": [
                "Fruits in room every day",
            ],
            "passport": "A256824",
            "nationality": "Amazon Jungle",
        },
        "singleSupp": true,
        }
    ],
    "hotelList":[
        "Ikala Quito",
        "Ikala Galapagos",
        "Ikala Galapagos",
        "Iguana Crossing",
        "Ikala Galapagos"
    ],
    "dayByDayExp":[
        [
            {            
                "contactName" :"Mr Boxy Boxxer",
                "contactNumb": 9873655,
                "currency": "usd",
                "expenseKey": "guideExpense",
                "paxLimit": 16,
                "price":55,
                "priceDetail": "Transfer Service",
                "pricekey": "transferService"
            } 
        ],
        [],
        [
            {            
                "contactName" :"Galapa Guide",
                "contactNumb": 98288567,
                "currency": "usd",
                "expenseKey": "guideExpense",
                "paxLimit": 16,
                "price":180,
                "priceDetail": "Galapagos Guide",
                "pricekey": "fullDayServiceGALAPAGOS"
            } 
        ],



    ],
    "startingDate": "6/16/2023",
    "maxPaxNumb": 16,
    "duration": 6,
    "departureNotes":[
        "group of birders, need early breakfasts",
    ],
    }

const sampleItin={
    "LTCLogo": "galapagosElements",
    "highlights": [],
    "dayByDay": [
    {
    "dayInclusions": [
    "Private Transport",
    "English & Spanish speaking Galapagos naturalist guide",
    "Lunch",
    "Tortoise Farm entrance Fee",
    "Accommodation",
    "Noted excursions.",
    "Public bus airport.",
    "Public ferry tickets."
    ],
    "dayTitle": "Transfer In Baltra - Visit Highlands - Fausto Llerena Breeding Center (Charles Darwin)",
    "dayDescription": "Upon your arrival to the airport of Baltra Island AT 11:10am, our guide welcomes you and arranges your transfer to the city of Puerto Ayora, on the way, and using a local ferry, we will cross the beautiful Itabaca Canal, which separates Baltra and Santa Cruz Islands. On a private farm, we will enjoy a nice hike and a local lunch, during which we will be able to observe Giant Galapagos Tortoises in their natural environment. In the area, we can also observe different species of highland Galapagos birds. Once we arrive to the city of Puerto Ayora, we will walk to the Fausto Llerena Breeding Center where we will learn about the Galapagos National Parks work and observe tortoises of different species, as well as some land iguanas. At the Interpretation Center, we will enter a special air-conditioned chamber where we will be able to observe the embalmed body of the world-famous tortoise: Lonesome George, who is now in exhibition. Continue to the Hotel.",
    "overnightProperty": "Ikala Galapagos Hotel"
    },
    {
    "dayInclusions": [
    "Navigation aboard the First Class Galapagos Element Wind Speed Yacht.",
    "Lunch",
    "Snorkel Equipment ",
    "Santa Cruz Municipal Fee",
    "English & Spanish Speaking Galapagos Naturalist Guide",
    "Accommodation",
    "Noted Excursions",
    "Aquatic Taxis",
    "Breakfast"
    ],
    "dayTitle": "Day Tour To Floreana Island ",
    "dayDescription": "This day tour to Floreana Island starts at 6:30 AM with a short walk to the pier of Puerto Ayora, from where a local aquatic taxi will take us to the first-class Galapagos Element Wind Yacht with which we will start sailing to the small town of Puerto Velasco Ibarra located on Floreana Island. With little luck and during the navigation, we may be able to observe marine turtles, manta rays, several species of marine birds and perhaps whales. Once we arrive at Pto. Velasco Ibarra, a local water taxi will transport us from the speed boat to the pier of the town. There, we will have great chances to meet sea lions and marine iguanas enjoying the morning sun! Then, we will take a local transportation known as “Chiva” and start a 30-minute ride up to the highlands of Floreana Island.\nThe chiva will ascend following a mud road surrounded by typical dry vegetation of the coastal area. Later, as we ascend, it will transform into a lush, green vegetation. In this area, we also find some farms with plantations of bananas, coffee, cocoa, and other tropical plantations. Our short drive will end at the “pampada” from where we start a nice walk that permits us to observe the typical flora of the area. On our way, we will also encounter some giant Galapagos tortoises. They are very sensible and shy, so when we approach them, they will immediately hide into their carapaces. It is very important not to touch or feed these amazing animals. Our walk will continue until we reach a rocky area at base of the hill and where we find the place known as “Asilo de la Paz” (Peace Asylum), a historical place where the German Wittmer family settled down when they arrived to Floreana in 1932. During our walk we will observe the caves they used as their home before moving to the place which is now known as Puerto Velasco Ibarra. The whole ambiance of Asilo de la Paz is of complete tranquility, with a landscape of exuberant green vegetation, and if weather permits, we can enjoy awesome views of the surrounding hills and perhaps of the Pacific Ocean. After this visit, we descend to the point where we meet the chiva which will transport us back to town where we will enjoy a lunch prepared in a small, local restaurant. After a short rest, we go for a 1 km walk to the place known as “La Loberia”, a bay of beautifulscenery. The main attraction of this place is the presence of a small colony of sea lions (Zalophus Wollebacki). There is also a great chance to observe marine iguanas (Amblyrhynchus Cristatus) resting on the rocky areas. In the water of the bay, we will be able to observe marine turtles (Chelonia Midas Agazzisi). We will also have time to spend snorkeling, or just taking pictures and then we return to for some free time before boarding our Galapagos Element Wind Yacht for our navigation back to the city of Puerto Ayora.",
    "overnightProperty": "Ikala Galapagos Hotel"
    },
    {
    "dayInclusions": [
    "Full Day in Shared services ",
    "Lunch",
    "Aquiatic Taxis",
    "Santa Cruz municipal Tax fee",
    "Snorkel Equipment",
    "Speedboat for the day tour.",
    "Accommodation",
    "Breakfast",
    "English & Spanish Speaking Galapagos Naturalist Guide"
    ],
    "dayTitle": "Day Tour to Pinzon Island and Las Palmitas Beach",
    "dayDescription": "Pinzon Island also known as Duncan. It was named in honor of the Pinzon brothers, captains La Pinta and La Niña, the two caravels that accompanied the Santa Maria on the first voyage of Christopher Columbus. Pinzon is home to giant tortoises, sea lions and other endemic species, plus marine iguanas and dolphins can be found.\nOne of the visits we will make will be in Penguin Bay, here you can see colorful fish. We will snorkel, and appreciate sharks, tintoreras, sea lions and manta rays. Lots of sea turtles and starfish can be seen under these turquoise waters. In cold weather you can often see penguins of Galapagos play in the sea. \nOn the way to Penguin Bay, we will make a brief stop to observe on a rock in the middle of the sea as hundreds of birds such as blue -footed boobies and other endemic birds stop for a moment to rest next to sea lions and seagulls.\n‘The Rock’, is a stone of 20 meters located in the middle of the sea, in this place we will see blue-footed boobies and lava gulls. The last point of the tour is the wet landing in Playa Las Palmitas, where we will have a guided walk accompanied by our guide who will give the briefing and explain about the area and the species of it, can perform another snorkeling activity. When arriving at our destination we will have a Humid landing in the palmitas place where we will make a guided walk in which our guide will explain us about the area, as well as the flora and fauna.\nOnce our activities have been completed in Las palmitas, we board to perform a snorkeling activity between Las palmitas and Puerto Ayora, where we will also make an experiential fishing demonstration, in case you get to catch a fish this is served fresh at the time as part of the activity.\nOn this beautiful beach surrounded by mangroves, you can see a variety of species, including sharks, sea turtles, rays, sea lions and marine iguanas. You'll also could disembark for a discovery hike through mangroves and pass by spiny cacti and candelabra cacti to see Darwin finches, synsontes, pelicans, lava herons and blue-footed boobies.",
    "overnightProperty": "Ikala Galapagos Hotel"
    },
    {
    "dayInclusions": [
    "Speed boat for the day tour",
    "Santa Cruz municipal tax Fee.",
    "Lunch",
    "Accommodation",
    "Breakfast",
    "English & Spanish Speaking Galapagos Naturalist Guide",
    "Transport in Taxi to Academy bay x3 pax",
    "Day tour in shared services x2 pax",
    "Aquatic Taxis"
    ],
    "dayTitle": "Transfer to Academy Bay - day tour to North Seymour ",
    "dayDescription": "After somo passenger tzke the transport to Academy bay to take diving activities (bu yoursel), the other passenger are going ti take the speed boat to take the tour to North Seymour, after a dry landing, we will have reached a small, low island consisting of elevated underwater lava. Along the coast there is a sand path where you will find marine and land iguanas, Galapagos sea lions, pelicans, forked-tailed gulls and many more birds. The trail continues inland through the nesting area of the two species of frigates (magnificent and large) and blue-footed boobies. You might also see Red-footed, although this species does not nest on North Seymour Island.\nNorth Seymour is the only island in the Galapagos archipelago where you have the opportunity to see the extraordinary courtship shows of the great and magnificent frigates throughout the year. The bright red balloons of the males perched on low bushes are observed trying to impress the females passing over, using air sacs known as gular bags, which inflate while vibrating their extended wings for a total effect.\nOnce the visit on North Seymour Island is over, we will sail for 30 minutes to Las Bachas Beach (which is located in the northern part of Island of Santa Cruz), during which time we will enjoy a delicious lunch on board.\nWe will have a wet landing on the white coral sand beach, there are several activities to do: Walk, snorkel or just relax on the beach.\nLas Bachas is one of the most beautiful beaches of the Galapagos Islands, has amazing turquoise and blue water, its fine sand and crystal clear waters will put a perfect end to this tour, which will undoubtedly be unforgettable. Here you can snorkel and see sea turtles with small young sharks. We will finish with a short walk along the shore to the lagoon where you can see the Galapagos Flamingos, marine igualas and several birds in their natural habitat.\nAfter these activities, we will return on board to the Itabaca channel (20 minutes), and passengers will be taken to Puerto Ayora to their respective accommodations.\n",
    "overnightProperty": "Ikala Galapagos Hotel"
    },
    {
    "dayInclusions": [
    "Navigation aboard the First Class Galapagos Element Wind Speed Yacht.",
    "Accommodations",
    "Lunch ",
    "Snorkel Equipment",
    "Breakfast",
    "English & Spanish Speaking Galapagos Naturalist Guide",
    "Aquatic Taxis",
    "Isabela Municipal Tax Fee",
    "Santa Cruz municipal tax fee"
    ],
    "dayTitle": "Day Tour To Isabela Island - Transfer to Isabela Hotel",
    "dayDescription": "The tour to Isabela Island starts at 6:30 AM when our guide picks you up from your hotel. After a short walk, you are at the pier of Puerto Ayora from where a local water taxi will take us to the Galapagos Element Wind Yacht to sail to the city of Pto. Villamil on Isabela Island. During our 3-hour navigation, there are great chances to observe marine turtles, manta rays, several species of marine birds and perhaps whales. Once at Pto. Villamil, a local water taxi will take us to the pier from where our private transportation takes us to the Isabela Turtles Breeding and Interpretation Center where our guide will explain us about the different activities developed by the National Park to protect this fragile environment. Here, we can also find Giant Galapagos Tortoises of different species and sizes. Afterwards, we start our walk to the place known as “Humedales” (Wetlands). The walk follows a well-maintained path from which we can observe this beautiful place composed by lagoons and rocks. It is surrounded by 4 species of mangroves and typical trees of the area. In the lagoons we can observe flamingos and migratory birds such as the charran or Gaviota de Galapagos (Creagrus furcatus), the Cerceta aliazul, etc.\nThe walk ends at one of the main streets, close to beach. Nearby, you can find a local restaurant where we will have lunch while enjoying a great view of the Pacific Ocean.\nAfter lunch, a short rest will be followed with a visit to the place known as “Las Tintoreras”, a scenic area where we find colonies of marine iguanas, sea lions, and as one of the main attractions we will be able to observe the sharks known as Tintoreras (White-tipped shark) resting in the channels formed by lava flows.\nLater, we can do some snorkeling perhaps accompanied by sea lions, penguins, and marine turtles. In the area close to the pier, we will have time to rest and enjoy the beach then our guide is going to take us to the hotel.\n",
    "overnightProperty": "Iguana Crossing Hotel "
    },
    {
    "dayInclusions": [
    "Accommodation ",
    "Box lunch",
    "Snorkel Equipment",
    "English & Spanish speaking Galapagos naturalist guide",
    "Breakfast",
    "Shared Day tour to Tuneles- Cabo Rosa"
    ],
    "dayTitle": "Tuneles and Cabo Rosa day tour ",
    "overnightProperty": "Iguana Crossing Hotel",
    "dayDescription": "The tour starts at in the morning, we first go to Roca Union a small islet located in the open sea where you can see Pelicans, Nazca boobies and Blue-footed boobies and one or two sea lions resting on the rocks.\nAfter this short stop you will sail for about 45 minutes to reach one of the most beautiful landscapes of rocky lava formations of the Galapagos Islands, it is called tunnels since in ancient eruptions the lava passed under the earth formed tunnels that then collapsed and gave rise to these arches over the water where you can clearly see vegetation coming out of the rocks, crystal clear water, the sea lions flutter between the arches.\nWe will snorkel in two different points, where we can see more of the flora and fauna of this place, as well as a small fishing activity. The tour includes a light box lunch in the boat after having done the two activities, after lunch we prepare for the return to Isabela."
    },
    {
    "dayInclusions": [
    "Inter-island flight to San Cristobal",
    "Lunch",
    "Accommodation",
    "Transfer out Isabela island",
    "Transfer In San Cristobal Island",
    "English & Spanish Speaking Galapagos Naturalist Guide in San Cristobal",
    "Assistance in the transfer out",
    "Breakfast"
    ],
    "dayTitle": "Transfer to take inter-island flight - Isabela - San Cristobal - Highlands",
    "dayDescription": "We are going to take our transport to the airport to take our inter-island flight to the island of San Cristobal, after our 45-minutes flight, we are going to arrive to San Cristobal island, our transport is going to take us to visit the highlands. La Galapaguera has an area of 2 hectares where giant tortoises walk freely. There is a path of 800 meters that runs through the place. The road passes through 2 small lagoons. Next to these lagoons, turtles are fed 2 times a day.On the beach of Puerto Chino nature lovers find a memorable point of visit, because they can hardly forget the shine of the skin of the sea lions that peresosa and nothing timidly frolic in the waves, exchanging spaces with countless birds and sea turtles. Transpor to Puerto Baquerizo Moreno to rest and enjoy teh town\n",
    "overnightProperty": "Galapagos SunSet Hotel"
    },
    {
    "dayInclusions": [
    "Day tour in shared mode to Kicker Rock ",
    "Diving Day tour to Kicker rock in shared mode",
    "Lunch on board",
    "aquatic Taxis",
    "Accommodation",
    "Breakfast",
    "Snorkel equipment"
    ],
    "dayTitle": "Day tour and Diving to Kicher Rock",
    "dayDescription": 
        "First, we head to Kicker Rock (travel time 45 mins). Leon Dormido or Kicker Rock is a rock formation located off the coast of San Cristobal Island of the Galapagos Islands. This small, magnificent island, rises to 500 ft above the ocean and is a favorite place for an array of marine birds. It has the apparance of a sleeping lion, hence its Spanish name Leon Dormido. Here you will snorkel for 1 hour in the channel of Kicker Rock which has a depth of 35 meters and reduces to a depth of 12 meters as you advance through the channel. The animals that can be seen are: white tip shark, black tip shark, galapagos shark, eagle rays, turtles and a variety of fish.\nThe second stop will be at Manglesito beach, which consists of 2 visiting areas: the mangrove area and the beach. The mangrove area is ideal for observing aquatic bird life. The beach is ideal for relaxing or swimming. In the mangrove area, you will find a lagoon where you can observe animals such as patillos, teros reales, and zarapitos amongst other native wildlife. The vegetation on the beach that you will see is sesubium edmonstonei and button mangrove. From Kicker Rock it will take us about 30 minutes to get to Manglesito beach where we will stay for 1 hour. We will eat lunch on the boat before you head off to explore the beach.\nIt should be noted that the conditions are different every day, so the animals that can be seen will vary.",
        "overnightProperty": "Galapagos SunSet Hotel"
    },
    {
    "dayInclusions": [
        "Breakfast",
        "English & Spanish Speaking Galapagos Naturalist Guide",
        "Private Transport"
    ],
    "dayTitle": "Visit to Punta Carola Beach and Cerro Tijeretas- Transfer out ",
    "dayDescription": 
        "In the mornign our transport is going to take us to a walk to “Cerro Tijeretas” where we can observe 2 species of frigate birds than inhabit\nthe Galapagos. We continue our walk toward the beautiful ‘Shipwreck” bay and to the isolated Playa Carola where we will observe a huge colony\nof sea lions. Return to the town where our guide and transport is going to take us to the airport to take our flight.\n"
    }
    ],
    "countryList": [
        "ecuador"
    ],
    "imgArr": [
        "https://dsm04pap002files.storage.live.com/y4mrmdRWskpMl5jG4Q55cRIq4imST0labjtm6ISel9qYPzaiTTB8lSN8urpTEu8MMguvJvDsO4tuT8QIBYm19D5-ACm1PtkO6RdTDHB2rwlXqSZYTJ_26BUW7lekHb6UcRxu1WRyeqbVYoeI4S9wgKAa4ctRjt4335TYd3oH4bNv1ZWM0y6n5_nM5VcGdgawTcn?width=2000&height=1150&cropmode=none"
    ],
    "included": [
        "Meals as Description",
        "Day tours as description in Shared Group",
        "Snorkel equipment for shared Tour",
        "Aquatic Taxis",
        "Island Municipal Fees",
        "Professional English & Spanish speaking Galapagos naturalist guide",
        "Noted excursions and activities",
        "Accommodation"
    ],
    "notIncluded": [
        "Flights to/ from Galapagos Island",
        "Galapagos National Park Entrance Fee",
        "Galapagos Visitor control Card Fee",
        "Tips",
        "Other activities",
        "Extras",
        "Personal Insurance"
    ],
    "tripName": "Island Hopping",
    "duration": "9",
    "startingDate": "6/18/2023",
    "tourOverview": "Transfer in Baltra - Highlands - Floreana Island - Pinzón Island - North Seymour - Isabela Island - San Cristobal Island - Kicher Rock - Punta Carola - Transfer out",
    "tourType": "nature",
    "difficulty": "2",
    "tripRef": "Browder x5",
    "tripLang": "English",
    "tourCode": "EC AE 12 23 / GE 47 23",
    "aComp": "Akorn ",
    "compContact": "Jessica Lema",
    "dateCreated": "2023-05-18T20:56:54.639Z",
    "version": 0,
    "status": 1,
    "user": {
        "name": "Gabriela Mogrovejo",
        "email": "sales@galapagoselements.com"
    }
}
  


// Bitacora logo:
// import TrackChangesIcon from '@mui/icons-material/TrackChanges';

export default function PlaygroundPage(props){
    const { data: session } = useSession()
    // ///////////////////////////////
    // ///////////////////////////////




/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// operations calc

    const [theItinerary, setTheItinerary]=useState()
    const [theDeparture, setTheDeparture]=useState()

    const [fileDisplayKey, setFileKey]=useState("intro")

    // price Chart
    const [thePriceChart, setPriceChart]=useState(LTCPriceTables)
    const [priceChartKey, setPriceChartKey]=useState("")

    // the expense obj
    const [expenseTrig, setExpTrig]=useState(false)
    const [expenseArr, setExpenseArr]=useState([])
    const [anExpense, setAnExpense]=useState()
    const [dayIndex, setDayIndex]=useState()

    // providers
    const [providerArr, setProviderArr]=useState([])
    const [paxData, setPaxData]=useState()

    useEffect(()=>{
        {paxStats(theDeparture, setPaxData)}
        let tempContArr=[...providerArr]
        if(theDeparture){

        // does this need to run every time theDep changes?
        theDeparture.dayByDayExp.forEach((elem)=>{
            elem.forEach((element)=>{
                const findContact = providerArr.find(elemental => elemental.contactName === element.contactName)
                if(findContact===undefined){
                    let tempProviderObj = {
                        "contactName": element.contactName,
                        "contactNumb": element.contactNumb,
                        "expenseKey": element.expenseKey,
                        "priceDetail": element.priceDetail
                    }
                    tempContArr.push(tempProviderObj)
                }
            })
        })
        }
        setProviderArr(tempContArr)
    },[theDeparture])

    // utils
    const paxStats=(theItin, setPxData)=>{
        if(theItin){

        let paxTotal = 0
        let roomObj= {
            "singleRooms":0,
            "twinRooms":0,
            "matrimonialRooms":0,
            "tripleRooms":0,
            "quadRooms":0,
        }
        let nationalityArr=[]
        // each guest loop
        theItin.roomingList.forEach((elem)=>{
            if(elem.guest){
                paxTotal= paxTotal + 1;
                const findContact = nationalityArr.find(element => element === elem.guest.nationality)
                if(!findContact){nationalityArr.push(elem.guest.nationality)}
            }
            if(elem.guest2){
                paxTotal= paxTotal + 1
                const findContact = nationalityArr.find(element => element === elem.guest2.nationality)
                if(!findContact){nationalityArr.push(elem.guest2.nationality)}
            }
            if(elem.guest3){
                paxTotal= paxTotal + 1
                const findContact = nationalityArr.find(element => element === elem.guest3.nationality)
                if(!findContact){nationalityArr.push(elem.guest3.nationality)}
            }
            if(elem.guest4){
                paxTotal= paxTotal + 1
                const findContact = nationalityArr.find(element => element === elem.guest4.nationality)
                if(!findContact){nationalityArr.push(elem.guest4.nationality)}
            }
            if(elem.singleSupp){
                roomObj={
                    ...roomObj,
                    "singleRooms":roomObj.singleRooms + 1
                }
            }
            if(elem.accomodationType==="twin"){
                roomObj={
                    ...roomObj,
                    "twinRooms":roomObj.twinRooms + 1
                }
            }
            if(elem.accomodationType==="matrimonial"){
                roomObj={
                    ...roomObj,
                    "matrimonialRooms":roomObj.matrimonialRooms + 1
                }
            }
            if(elem.accomodationType==="triple"){
                roomObj={
                    ...roomObj,
                    "tripleRooms":roomObj.tripleRooms + 1
                }
            }
            if(elem.accomodationType==="quad"){
                roomObj={
                    ...roomObj,
                    "quadRooms":roomObj.quadRooms + 1
                }
            }

        })

        setPxData({
            "paxTotal":paxTotal,
            "roomReq": roomObj,
            "nationalityArr":nationalityArr
        })
        }
    }
    const optCataloger=(priceChart)=>{

        let priceChartKeyArr = Object.keys(priceChart)
        let optNameArr =[]
        if(priceChartKeyArr.length>0){
            priceChartKeyArr.forEach((elem, i) => {
                optNameArr.push(catalogIndex[elem])
            });
        }

        let optNameArr2=[]
        let priceChartKeyArrTwo=[]
        let dropdownOpts
        let theSecondLevel

        if(priceChartKey){
            theSecondLevel = priceChart[priceChartKey]
            theSecondLevel.forEach((elem, i) => {
                priceChartKeyArrTwo.push(elem.priceKey)
            });
            theSecondLevel.forEach((elem, i) => {
                optNameArr2.push(elem.priceDetail)
            });
            dropdownOpts= theSecondLevel.map((elem,i)=><React.Fragment key={i}> 
                <option value={JSON.stringify(elem)}>                 
                {elem.priceDetail} </option>
            </React.Fragment>)
        }

        return(<>

            {aDropdownPicker(priceChartKeyArr, "Expense Type", false, anExpense, setPriceChartKey, optNameArr )}

            {priceChartKey&& <> 

                <select  className={styles.inputUserUI} onChange={(e)=> {
                    let tempObj=JSON.parse(e.target.value)

                    if(tempObj.contactName){
                        setAnExpense({
                            ...tempObj,
                            "contactNumb": 100000,
                        })
                    } else {
                        setAnExpense({
                            ...tempObj,
                            "contactName": "Provider",
                            "contactNumb": 100000,
                        })
                    }
                    }}>
                    <option disabled selected  > Select Expense Type </option>
                    {dropdownOpts}
                </select>

            </>}
        </>)
    }
    function addDays(theDate, days){
        let result = new Date(theDate);
        result.setDate(result.getDate() + days)
        return result;
    }




    // expense form
    const expenseEditor=(theExpense, setTheExpense, contactArr, dayIndx, theDep, setTheDep, roomingData)=>{
        if(theExpense){ 
        let priceArrDispAndEditor
        if(theExpense.priceArr){
            let priceAndPx= theExpense.priceArr.map((elem,i)=> <React.Fragment key={i}>
            <div className={styles.aPriceColumn} onClick={()=>{
                    setTheExpense({
                        ...theExpense,
                        "price": elem
                    })
                }}>
                <span><strong>{i+1}</strong></span>
                <span>${elem} </span>
            </div>
            </React.Fragment>)
            priceArrDispAndEditor=<><div className={styles.priceDataRow}>
                <div className={styles.aPriceColumn}>
                    <span><strong>Pax </strong></span> 
                    <span><strong>$$- </strong></span>
                </div> 
                {priceAndPx}
            </div></> 
        }
        let contactOpts
        if(contactArr.length>0){
            contactOpts=contactArr.map((elem,i)=><React.Fragment key={i}>
                <div className={styles.addContactBTN} onClick={()=>{
                    setTheExpense({
                        ...theExpense,
                        "contactName": elem.contactName,
                        "contactNumb": elem.contactNumb,
                    })
                }}> + {elem.contactName} </div>
            </React.Fragment>)
        }


        const accomOptAndPicker=()=>{
            let eachRoomOpt=anExpense.roomPriceArr.map((elem, i)=><React.Fragment key={i}>
                <div className={styles.aRoomOpt}>
                    <div className={styles.aColumn}>
                        <div className={styles.roomOptLabel}>Room Type</div>
                        <div className={styles.aRoomDescription}>{elem.roomDescription}</div>
                    </div>
                    <div className={styles.aColumn}>
                        <div className={styles.roomOptLabel}>price [room] </div>
                        <div className={styles.aRoomPrice}> 
                            ${elem.price}
                            </div>
                    </div>

                {/* room requ & Price Calc */}
                    <div className={styles.aColumn}>
                        <div className={styles.roomOptLabel}>room req</div>
                        <div className={styles.aRoomPrice}>
                            <div style={{width:"33px"}}> 
                                {anExpense.roomPriceArr[i].reqRooms?<>
                                    <span onClick={()=>{
                                        let prevCount = anExpense.roomPriceArr[i].reqRooms
                                        let roomPriceTotal
                                        if(prevCount){

                                            if(anExpense.roomPriceArr[i].reqAdditionalBed){
                                            roomPriceTotal=
                                                ((prevCount-1)* anExpense.roomPriceArr[i].price)
                                                +
                                                (anExpense.roomPriceArr[i].reqAdditionalBed 
                                                *
                                                anExpense.roomPriceArr[i].additionalBed)
                                            } else {
                                            roomPriceTotal=
                                                ((prevCount-1)* anExpense.roomPriceArr[i].price)
                                            }

                                            let tempRoomObj={
                                                ...anExpense.roomPriceArr[i],
                                                "reqRooms": prevCount-1,
                                                "roomsTotal":roomPriceTotal
                                                }


                                            anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                                            setAnExpense({...anExpense})

                                            // console.log(prevCount-1, anExpense.roomPriceArr[i], ((prevCount-1)* anExpense.roomPriceArr[i].price))

                                        }
                                    }}> 
                                    {anExpense.roomPriceArr[i].reqRooms&&<>
                                        <RemoveCircleOutlineIcon />
                                    </>}
                                    </span>
                                </>: <> </>}
                            </div>
                            <div style={{width:"33px", textAlign: "center"}}> 
                                <span> 
                                    {anExpense.roomPriceArr[i].reqRooms?<>
                                       x {anExpense.roomPriceArr[i].reqRooms}
                                    </>:<> 
                                       x 0
                                    </>}
                                </span>
                            </div>
                            <div style={{width:"33px"}}> 
                                <span onClick={()=>{
                                    let prevCount = anExpense.roomPriceArr[i].reqRooms
                                    let roomPriceTotal
                                    if(prevCount){
                                        if(anExpense.roomPriceArr[i].reqAdditionalBed){
                                        roomPriceTotal=
                                            ((prevCount+1)* anExpense.roomPriceArr[i].price)
                                            +
                                            (anExpense.roomPriceArr[i].reqAdditionalBed 
                                            *
                                            anExpense.roomPriceArr[i].additionalBed)
                                        } else {
                                        roomPriceTotal=
                                            ((prevCount+1)* anExpense.roomPriceArr[i].price)
                                        }
                                        let tempRoomObj={
                                            ...anExpense.roomPriceArr[i],
                                            "reqRooms": prevCount+1,
                                            "roomsTotal":roomPriceTotal
                                            }
                                        anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                                        setAnExpense({...anExpense})
                                    } else {
                                        if(anExpense.roomPriceArr[i].reqAdditionalBed){
                                        roomPriceTotal=
                                            (1 * anExpense.roomPriceArr[i].price)
                                            +
                                            (anExpense.roomPriceArr[i].reqAdditionalBed 
                                            *
                                            anExpense.roomPriceArr[i].additionalBed)
                                        } else {
                                        roomPriceTotal=
                                            (1 * anExpense.roomPriceArr[i].price)
                                        }
                                        let tempRoomObj={
                                            ...anExpense.roomPriceArr[i],
                                            "reqRooms":1,
                                            "roomsTotal":roomPriceTotal
                                            }
                                        anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                                        setAnExpense({...anExpense})
                                    }
                                }}>
                                    <AddCircleOutlineIcon/>
                                </span>
                            </div>
                        </div>

                    </div>                    

                {/* Additional Bedding Req */}
                    <div className={styles.aColumn}>
                        {elem.additionalBed&&<>
                        <div className={styles.roomOptLabel}>Additional bed</div>
                        <div className={styles.aRoomPrice}>
                            + &nbsp; ${elem.additionalBed} 
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div style={{width:"18px"}}> 
                                {anExpense.roomPriceArr[i].reqAdditionalBed?<>
                                    <span onClick={()=>{
                                        let prevCount = anExpense.roomPriceArr[i].reqAdditionalBed
                                        let roomPriceTotal
                                        if(prevCount){
                                            roomPriceTotal=
                                                ((prevCount-1) * anExpense.roomPriceArr[i].additionalBed)
                                                +
                                                (anExpense.roomPriceArr[i].price 
                                                *
                                                anExpense.roomPriceArr[i].reqRooms)
                                            let tempRoomObj={
                                                ...anExpense.roomPriceArr[i],
                                                "reqAdditionalBed": prevCount-1,
                                                "roomsTotal": roomPriceTotal
                                                }
                                            anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                                            setAnExpense({...anExpense})
                                        }
                                    }}> 
                                    {anExpense.roomPriceArr[i].reqAdditionalBed&&<>
                                        <RemoveCircleOutlineIcon />
                                    </>}
                                    </span>
                                </>: <> </>}
                            </div>
                            <div style={{width:"39px", textAlign: "center"}}> 
                                <span> 
                                    {anExpense.roomPriceArr[i].reqAdditionalBed?<>
                                        x {anExpense.roomPriceArr[i].reqAdditionalBed}
                                    </>:<> 
                                        x 0
                                    </>}
                                </span>
                            </div>
                            <div style={{width:"33px"}}> 
                                <span onClick={()=>{
                                    let prevCount = anExpense.roomPriceArr[i].reqAdditionalBed
                                    let roomPriceTotal
                                    if(prevCount){

                                        roomPriceTotal=
                                            ((prevCount+1) * anExpense.roomPriceArr[i].additionalBed)
                                            +
                                            (anExpense.roomPriceArr[i].price 
                                            *
                                            anExpense.roomPriceArr[i].reqRooms)                                      

                                        let tempRoomObj={
                                            ...anExpense.roomPriceArr[i],
                                            "reqAdditionalBed": prevCount+1,
                                            "roomsTotal":roomPriceTotal
                                            }
                                        anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                                        setAnExpense({...anExpense})
                                    } else {
                                        roomPriceTotal=
                                        ( 1 * anExpense.roomPriceArr[i].additionalBed)

                                        let tempRoomObj={
                                            ...anExpense.roomPriceArr[i],
                                            "reqAdditionalBed":1,
                                            "roomsTotal":roomPriceTotal
                                            }
                                        anExpense.roomPriceArr.splice(i,1, tempRoomObj)
                                        setAnExpense({...anExpense})
                                    }
                                }}>
                                    <AddCircleOutlineIcon/>
                                </span>
                            </div>
                        </div>
                        </>}
                    </div>

                {/*  price display */}
                    <div className={styles.aColumn}> 
                        {elem.roomsTotal?<>
                            <div className={styles.roomOptLabel}>Room total</div>
                            <div className={styles.aRoomDescription}> ${elem.roomsTotal}</div> 
                        </> :<> </>}
                    </div>
                </div>
            </React.Fragment>)

            return(<>
                <strong style={{letterSpacing:"1px"}}>NEEDED ROOMS</strong>
                {theRoomingBreakdownDispl()}
                <div className={styles.roomOptsGrid}> 
                    {eachRoomOpt}
                </div>

            </>)
        }

        return(<>
            <form className={styles.expenseForm} 
            onSubmit={(e)=>{
                // send to back end 

                e.preventDefault()
                let updatingExpArr
                if(theDep.dayByDayExp[dayIndx]){
                    updatingExpArr=[...theDep.dayByDayExp[dayIndx]];
                } else {
                    updatingExpArr=[]
                }
                updatingExpArr.push(anExpense)
                theDep.dayByDayExp.splice(dayIndx,1,updatingExpArr)

                setTheDep({
                    ...theDep,
                    "dayByDayExp": theDep.dayByDayExp
                })

                setPriceChartKey()
                setTheExpense()
                setExpTrig(false)
            }}> 
                {contactArr.length>0&& <>
                    <br></br>
                    {theExpense?.expenseKey==="accommodation"?<> 

                    </>:<> 
                        Previous providers:
                        <div style={{display:"flex", alignItems:"center", margin:'9px'}}> {contactOpts} </div>
                    </>}
                </>}

                <div className={styles.aDataRow}>

                    <div style={{width: "47%" }}> 
                        {anInputDisplayer("Contact Name*", "contactName", "text", false, theExpense.contactName, theExpense, setTheExpense)}</div>
                    <div style={{width: "47%" }}> 
                        {anInputDisplayer("Contact #", "contactNumb", "number", false, theExpense.contactNumb, theExpense, setTheExpense)}</div>
                
                    {/* currency  non op */}
                    {/* <div style={{width: "21%" }}>
                        {aDropdownPicker(currencyArr, "$", "currency", theExpense, setTheExpense, false, false)}</div>  */}
                </div>

                {theExpense?.expenseKey==="accommodation"?<>
                    <div style={{width: "70%" }}> 
                        {anInputDisplayer("Expense Detail", "priceDetail", "text", false, theExpense.priceDetail, theExpense, setTheExpense)}</div>
                    
                    {accomOptAndPicker()}

                </>:<>

                <div className={styles.aDataRow}>
                    <div style={{width: "70%" }}> 
                        {anInputDisplayer("Expense Detail", "priceDetail", "text", false, theExpense.priceDetail, theExpense, setTheExpense)}</div>
                    {theExpense.price&&<>
                    <div style={{width: "25%" }}> 
                        {anInputDisplayer("Price", "price", "number", false, theExpense.price, theExpense, setTheExpense)}</div>
                        </>}
                </div>
                {theExpense.priceArr&&<>
                    <div className={styles.inputLabel}> Price Table </div>
                    <i> Please select a value:</i>
                    {priceArrDispAndEditor}
                </>}
                <div style={{display: "flex", width:"100%", justifyContent:"space-between"}}>
                    <div style={{width: "70%" }}> 
                        {anInputDisplayer("Additional Description", "additionalDescription", "text", false, "Extra service details", theExpense, setTheExpense)}</div> 
                    {theExpense.expenseKey==="variableExpense"? <> 
                    <div style={{width: "25%" }}> 
                        {anInputDisplayer("#Needed", "varExpTickets", "number", true, paxData.paxTotal, theExpense, setTheExpense)}</div>
                    </>:<>
                    <div style={{width: "25%" }}> 
                        {anInputDisplayer("max pax", "paxLimit", "number", false, theExpense.paxLimit, theExpense, setTheExpense)}</div>
                    </>}
                </div>
                </>}
                <input className={styles.secondaryBTN} type="submit" value="Add Expense to Day +" />
            </form>
        </>)
        } 
    }

    const totalsAdder=(theExpenseArr)=>{
        let adderNumb = 0

        if(theExpenseArr.length>0){
            theExpenseArr.forEach((elem)=>{
                // if varExpense, multiply elem.price*varExpTickets
                if(elem.expenseKey==="variableExpense"){
                    adderNumb = adderNumb + (elem.price * elem.varExpTickets)
                } else {
                    adderNumb= adderNumb + elem.price
                }
            })

            return(<>
                <h3>Daily Totals:</h3>
                <div className={styles.anExpenseDisp}>
                    <div> Total </div>
                    <div> $ {adderNumb} </div>
                </div>
            </>)
        }
    }

    // Main disp
    const aFileDisplayer=(theItin, theDep)=>{
        return(<>
            <div className={styles.keySelectors}>

        {/* Selection */}
            {fileDisplayKey!="intro"&&<> 
                <span onClick={()=>setFileKey("intro")}>home </span></>}
            {fileDisplayKey!="rooming"&&<> 
                <span onClick={()=>setFileKey("rooming")}>rooming list </span></>}
            {fileDisplayKey!="providers"&&<> {providerArr.length>0&&<> 
                <span onClick={()=>setFileKey("providers")}>providers </span>
                </>}</>}
            {fileDisplayKey!="expenses"&&<> 
                <span onClick={()=>setFileKey("expenses")}>expenses</span></>}


            </div>

        {/* Display */}

            <div className={styles.aFileContainer}>
            {fileDisplayKey==="intro"&&<>
                {itineraryHeaderDisp(theItin, theDep)}
            </>}
            {fileDisplayKey==="rooming"&&<>
                {roomingListDisp(theDep)}
            </>}
            {fileDisplayKey==="providers"&&<>
                {contactArrDisp(providerArr)}
            </>}
            {fileDisplayKey==="expenses"&&<>
                {expenseDisplayer(theDep.dayByDayExp, theItin.dayByDay)}
            </>}

            </div>
        </>)
    }
    const itineraryHeaderDisp=(theItin, theDep)=>{
        let LTCLogoSwitcher
        if(theItin){
        switch (theItin.LTCLogo) {
            case "galapagosElements":
                LTCLogoSwitcher =<><h3>Galapagos Elements</h3></>
                break;
            case "ecoAndes":
                LTCLogoSwitcher=<><h3>EcoAndes Travel</h3></>
                break;
            case "yacuma":
                LTCLogoSwitcher=<><h3>Yacuma EcoLodge</h3></>
                break;
            case "unigalapagos":
                LTCLogoSwitcher=<><h3>Unigalapagos</h3></>
                break;
            default:
                break;
        }
        const eachIntroDetail=(theTitle, theDetail)=>{
            return(<>
            <div className={styles.eachDetailCont}>
                <div className={styles.eachDetailTitle}>{theTitle}</div>
                <div>{theDetail}</div>
            </div>
            </>)
        }

        const aDateDisp=(dateLabel, theDate, tripDuration)=>{
            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            let firstDate=new Date(theDate)
            let toDateFormatter 
            let upperLimitDate           
            if(tripDuration){
                let theDuration = parseInt(tripDuration)
                upperLimitDate = addDays(theDate, theDuration +1)
                toDateFormatter = upperLimitDate.toLocaleDateString('en-GB', dateOptions)
            } else {
                toDateFormatter = firstDate.toLocaleDateString('en-GB', dateOptions)
            }

            return(<>
            <div className={styles.eachDateCont}>
                <div className={styles.eachDetailTitle}>{dateLabel}</div>
                <div>  
                    {toDateFormatter}                
                </div>
            </div>
            </>)
        }


        return(<>
            {LTCLogoSwitcher}
            <h1>{theItin.tripName}</h1>
            <div className={styles.roomingListCont} > 
                <div className={styles.detailDispl}>
                    {theItin.tripLang&&<>{eachIntroDetail("trip language", theItin.tripLang)}</>}
                    {theItin.tourCode&&<>{eachIntroDetail("Tour code", theItin.tourCode)}</>}
                    {theItin.aComp&&<>{eachIntroDetail("company", theItin.aComp)}</>}
                    {theItin.compContact&&<>{eachIntroDetail("contact", theItin.compContact)}</>}
                    {theItin.tripRef&&<>{eachIntroDetail("trip Reference", theItin.tripRef)}</>}
                </div>
                <h2> Tour Dates </h2>
                <div className={styles.theDatesCont}> 
                    {aDateDisp("starting date", theDep.startingDate)}
                    {aDateDisp("Ending date", theDep.startingDate, theDep.duration)}
                </div>
            </div>
        </>)
        }
    }

    const theRoomingBreakdownDispl=()=>{
        return(<>
            <div className={styles.roomingListTotalCont}>
                {paxData?.roomReq.singleRooms>0&&<><div>{paxData.roomReq.singleRooms} SINGLE Room{paxData.roomReq.singleRooms>1&&<>s</>}</div></>} 
                {paxData?.roomReq.twinRooms>0&&<><div>{paxData.roomReq.twinRooms} twin Room{paxData.roomReq.twinRooms>1&&<>s</>}</div></>} 
                {paxData?.roomReq.matrimonialRooms>0&&<><div>{paxData.roomReq.matrimonialRooms} matrimonial Room{paxData.roomReq.matrimonialRooms>1&&<>s</>}</div></>} 
                {paxData?.roomReq.tripleRooms>0&&<><div>{paxData.roomReq.tripleRooms} triple Room{paxData.roomReq.tripleRooms>1&&<>s</>}</div></>} 
                {paxData?.roomReq.quadRooms>0&&<><div>{paxData.roomReq.quadRooms} cuadruple Room{paxData.roomReq.quadRooms>1&&<>s</>}</div></>} 
            </div>
        </>)
    }
    const roomingListDisp=(theDeparture)=>{

        const ageConverter=(theDOB)=>{
            let toDate=new Date()
            if(theDOB){
            let clientDOB=new Date(theDOB)
            return toDate.getUTCFullYear() - clientDOB.getUTCFullYear()
            }
        }

        let eachNote=[]
        const eachGuestData=(guestData)=>{
            if(guestData.guestNotes){
                eachNote.push({
                    "name":guestData.guestName,
                    "notes":guestData.guestNotes
                })
            }
            return(<>
                <div className={styles.roomingGuestRow}>
                    <div style={{width:"180px", textAlign:"start"}}> &nbsp; {guestData.guestName}</div>
                    <div style={{width:"120px", borderLeft:"solid 1px black" }}> {guestData.nationality}</div>
                    <div style={{width:"100px", borderLeft:"solid 1px black" }}> {guestData.guestDOB}</div>
                    <div style={{width:"120px", borderLeft:"solid 1px black" }}> {guestData.passport}</div>
                    <div style={{width:"66px", borderLeft:"solid 1px black" }}> {ageConverter(guestData.guestDOB)}</div>
                </div>
            </>)
        }

        if(theDeparture){
        let eachRoom=theDeparture.roomingList.map((elem, i)=>
            <React.Fragment key={i}>
                <div className={styles.eachRoomDisplayer}>
                    <div style={{width:"33px"}}> {i+1} </div>
                    <div className={styles.aRoomingDetail} style={{width:"108px", borderLeft:"solid 1px black"}}>
                        {elem.singleSupp&&<>SINGLE</>}
                        {elem.accomodationType}
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        {eachGuestData(elem.guest)}
                        {elem.guest2&&<>{eachGuestData(elem.guest2)}</>}
                        {elem.guest3&&<>{eachGuestData(elem.guest3)}</>}
                        {elem.guest4&&<>{eachGuestData(elem.guest4)}</>}
                    </div>
                </div>
            </React.Fragment> )

        let noteDisp
        if(eachNote.length>0){
            noteDisp=eachNote.map((elem,i)=><React.Fragment key={i}> 
                <div className={styles.eachRoomDisplayer}>
                    <span style={{width:"180px", textAlign:"start"}}>{elem.name}</span>
                    <span style={{borderLeft:"solid 1px black", textTransform:"capitalize"}}> &nbsp; 
                    {elem.notes.map((elem,i)=><React.Fragment key={i}>{i>0&&<>, </>} {elem}</React.Fragment>)}
                    </span>
                </div>
            </React.Fragment> )
        }

        return(<>
        <div className={styles.roomingListCont}>
        <h2> Rooming List</h2>
            {paxData&&<><div className={styles.guestTotal}>{paxData.paxTotal} guests</div></>} 
        {theRoomingBreakdownDispl()}
        <div className={styles.roomingListGrid}>
            <div className={styles.roomingListKEYS}>
                <div style={{width:"33px"}}> # </div>
                <div style={{width:"108px", borderLeft:"solid 1px black"}}>ROOM TYPE</div>
                <div style={{width:"180px", borderLeft:"solid 1px black", textAlign:"start" }}>&nbsp;&nbsp;GUEST NAME </div>
                <div style={{width:"120px", borderLeft:"solid 1px black" }}> NATIONALITY </div>
                <div style={{width:"100px", borderLeft:"solid 1px black" }}> D.O.B. </div>
                <div style={{width:"120px", borderLeft:"solid 1px black" }}> PASSPORT </div>
                <div style={{width:"66px", borderLeft:"solid 1px black" }}> AGE </div>
            </div>
            {eachRoom}
        </div>

        {eachNote.length>0&&<>
            <h2>Guest Notes </h2>
            <div className={styles.roomingListGrid}>
            <div className={styles.roomingListKEYS}>
                <div style={{width:"180px" }}> GUEST NAME </div>
                <div style={{borderLeft:"solid 1px black" }}>&nbsp; SPECIAL INDICATIONS </div>
            </div>
                {noteDisp}
            </div>
        </>}
        </div>
        </>)
    }
    }    
    const expenseDisplayer=(theExpenseArr, dayByDay)=>{

        const anExpenseDisp=(eachExp)=>{
            return(<>
            <div className={styles.anExpenseDisp}>
                <div style={{width:"55%"}}> {eachExp.priceDetail} </div>
                <div style={{display:"flex"}}>
                {providerArr.length>1&&<><strong>
                    {eachExp.contactName!="Provider"&&<>{eachExp.contactName}</>} |</strong></>}
                <div style={{width:"27px", textAlign:"end"}}> {eachExp.varExpTickets&& <>{eachExp.varExpTickets} x </>} </div>
                <div style={{width:"66px", textAlign:"end"}}> $ {eachExp.price}</div></div>
            </div>
            </>)
        }
        const expenseMapper=(dailyExpArr)=>{
            if(dailyExpArr){
                return(<>
                    {dailyExpArr.map((element, i)=><React.Fragment key={i}>
                        {anExpenseDisp(element)}
                    </React.Fragment>)}
                </>)
            }
        }

        let eachDayTitleExp=dayByDay.map((dayElem, i)=><>
        <React.Fragment key={i}>
            <div className={styles.dailyTitleCont}>  
                <h4> Day {i+1}: {dayElem.dayTitle&&<>{dayElem.dayTitle}</>}</h4>
                <div className={styles.addExpBTN} onClick={()=>{
                    setExpTrig(true)
                    setDayIndex(i)
                }}>
                    <AddCircleOutlineIcon/>
                </div>
            </div>
            {expenseMapper(theExpenseArr[i])}

        </React.Fragment>
        </>)

        if(theExpenseArr.length>0){
        return(<>
            <h3>Expenses:</h3>
            <div className={styles.expenseGridDisp}>
                {eachDayTitleExp}
            </div>
        </>)
        }
    }
    const contactArrDisp=(theArr)=>{
        if(theArr.length>0){
            const guideTypeSwitcher=(theKey)=>{
                switch (theKey) {
                    case "guideExpense":
                        return " - Guide Service:";
                        
                }
            }
            let eachContact=theArr.map((elem, i)=><React.Fragment key={i}>
                <div className={styles.anExpenseDisp}>
                {/* have different displayers for guides, accoms, transport, other providers */}
                    <div><strong>{elem.contactName}</strong> {guideTypeSwitcher(elem.expenseKey)} {elem.priceDetail&&<>{elem.priceDetail}</>}</div>
                    {elem.contactNumb!=100000 &&<><div> # 0{elem.contactNumb}</div></>}
                </div>
            </React.Fragment> )
            return(<>
                <h3>Providers:</h3>
                {eachContact}
            </>)            
        }
    }

    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////

    console.log(theDeparture.dayByDayExp)

    return(<>

    {/* Will we need session on per page level, or just on Navi and it can controll it all???? */}
        {session&&<> 
            <GMSNavii  user={session.user} />

            <h1>
            Cucu
            </h1>

            <ul> 
                <dl> 
                    <dd>create different docs from templates, and display each provider's services </dd>
                    <dd> Req Economico per provider </dd>
                </dl>

                <li> Add additional expense functionality  </li>
                <dl> 
                    <dt> Hotel Expenses </dt>
                    <dd> if eachDay.overnightProperty? add to contactList </dd>
                    <dd> Can select room type, & set price per type </dd>
                    <dd> Can select number of rooms per type </dd>
                    <dd> Hotel name and address required </dd>
                    <dd> feed hotel contact from prev hotels </dd>
                </dl>
                bring in sampleDep, calculate number of pax in rooming list, use to calc variable prices. 
            </ul>

            <div className={styles.playgroundPage}>
            {/* display Rooming req, rooming List Stats */}

            {/* Day by day elems */}
                {theDeparture&& <>
                    {aFileDisplayer(theItinerary, theDeparture)}

                {expenseTrig&&<>
                <br/>
                    <div className={styles.aFileContainer}>
                    <h3>Add expense to day {dayIndex+1} </h3>
                    {optCataloger(thePriceChart)}
                    {expenseEditor(anExpense, setAnExpense, providerArr, dayIndex, theDeparture, setTheDeparture, paxData)}
                    </div>
                </>}

                </>}
            {/* IS OP */}

            
            
            {totalsAdder(expenseArr)}


            </div>

            {!theDeparture&& <> 
            {/* picking a dep and itin */}
                <div className={styles.secondaryBTN} onClick={()=>{
                    setTheDeparture(sampleDeparture)
                    setTheItinerary(sampleItin)
                    }}> Select Sample Dep </div>
            </>}

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>}
    </>)
}