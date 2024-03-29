// Hints
// 1.	Which components can be created directly in the HTML? Which components need to be created in JavaScript?
// 2.	Can you render mock data to the page?
// 3.	Can you render real data to the page?
// 4.	Are you able to fetch an array of all the parties from the API?
// 5.	Is state correctly updated to match the data from the API?
// 6.	Are you passing the correct arguments to fetch?
// 7.	Does the API return an error? If so, what is the error message?
// 8.	Is there an event listener on the form? Does it correctly add a new party to the list of parties?
// 9.	Is there an event listener attached to each delete button? Does it correctly remove a party from the list of parties?

// Remember:
    // Endpoints
//     /events
        // {
        //     id: 1,
        //     name: "Event Name",
        //     description: "This is a description of the event.",
        //     date: "2021-09-30T00:00:00.000Z", // Date ISO string
        //     location: "123 Street"
        //   }
    // Each resource has the following endpoints:

    // GET /<resource>
    // Sends an array of objects for the requested resource.

    // GET /<resource>/<id>
    // Sends a single object identified by the given id.

    // POST /<resource>
    // Attempts to create a new object. If successful, the created object is returned.

    // PUT /<resource>/<id>
    // Attempts to update the object identified by the given id. If successful, the updated object is returned.

    // DELETE /<resource>/<id>
    // Attempts to delete the object identified by the given id. Sends status code 204 if successful.
    // https://fsa-crud-2aa9294fe819.herokuapp.com/api/2311-FTB-MT-WEB-PT/events

//Let's start by defining what the API URL is anf the initial state
const COHORT = `2311-FTB-MT-WEB-PT`;
const BASE_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/`;
const RESOURCE = `/events`;
const API_URL = BASE_URL+COHORT+RESOURCE;

let state = { parties: [] };

async function fetchParties () {

    console.log("Fetching parties...");

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        state.parties = data.data;
        renderParties();
    } catch (error) {
        console.error("Error fetching parties:", error);
        // Handle the error (e.g., show a user-friendly message on the UI)
    }
}

//     const response = await fetch(API_URL); // Making the API call
//     const data = await response.json (); // I'll fetch the data if you await
//     state.parties = data.data; // updating state with the fetched parties

//     console.log("Parties fetched: ", state.parties);
    
//     renderParties();
// }

async function addParty (event) {

    event.preventDefault(); // Prevent the whole thing from being reloaded after submision
    const formData = new FormData(event.target);
    const party = Object.fromEntries(formData.entries());

    console.log("Adding party: ", party);
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(party),
        });
        if (!response.ok) throw new Error('Failed to add the party.');
        fetchParties();
        event.target.reset();
    } catch (error) {
        console.error("Error adding party:", error);
        // Handle the error
    }
}

    // await fetch(API_URL, {
    //     method: "POST", // method to add new party
    //     headers: { "Content-Type": "application/json" }, // Set content type header
    //     body: JSON.stringify(party), // cnvert to JSON

    // });


    // const response = await fetch(API_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(party),
    // });

    // if (response.ok) {
    //     fetchParties();
    //     event.target.reset();
    // } else {
        
    //     console.error(`Failed to add party: ${response.status} - ${response.statusText}`);
    // }
    // }

    // event.target.reset();

//     fetchParties();
// }

document.getElementById("addAnotherParty").addEventListener("click", () => {
    document.getElementById("addPartyForm").reset(); // Clear form for new input
});

async function deleteParty(id) {

    console.log("Deleting party with ID: ", id);

//     await fetch(`${API_URL}/${id}`, { method: "DELETE"}); // API call to delete the party
//     fetchParties();

// }
try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error('Failed to delete the party.');
    fetchParties();
} catch (error) {
    console.error("Error deleting party:", error);
    // Handle the error
}
}

function renderParties() {
//     const list = document.getElementById("partyList");

//     // Mappning party to HTML string and joining them
//     list.innerHTML = state.parties.map(party => `
//         <li>
//             ${party.name} - ${party.date} - ${party.time} - ${party.location}
//             <p>${party.description}</p>
//             <button onclick="deleteParty('${party.id}')">Delete</button>
//         </li>
//         `).join(``);

//         console.log("Parties rendered");
// }
const tbody = document.querySelector("#partyList tbody");

    tbody.innerHTML = state.parties.map(party => `
        <tr>
            <td>${party.name}</td>
            <td>${party.date}</td>
            <td>${party.time}</td>
            <td>${party.location}</td>
            <td>${party.description}</td>
            <td><button onclick="deleteParty('${party.id}')">Delete</button></td>
        </tr>
    `).join('');
    console.log("Parties rendered");
}


document.getElementById("addPartyForm").addEventListener("submit", addParty); // Attatching the addParty function to the form submission event
fetchParties();