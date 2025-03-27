document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("service-form");
    const services = document.getElementById("services");

    const clientInfo = document.getElementById("client-info");
    const serviceInfo = document.getElementById("service-info");

    fetch("http://localhost:3000/services")
        .then(response => response.json())
        .then(treatments => {
            treatments.forEach(treatment => {
                let serviceCard = document.createElement("div");
                serviceCard.className = "card";
                serviceCard.innerHTML = `
                    <img src="${treatment.image}" alt="service image">
                    <h3>Service name: ${treatment.service_name}</h3>
                    <p><strong>Service description: </strong>${treatment.description}</p>
                    <p><strong>Charge: </strong>${treatment.cost}</p>
                    <button> ${treatment.time_schedule}</button><br/>
                    <button class="book" id="${treatment.id}">Book Appointment</button>
                    <button class="delete">Delete</button>
                `;

                services.appendChild(serviceCard);

                const deleteButton = serviceCard.querySelector(".delete");
                deleteButton.addEventListener("click", function (e) {
                    e.preventDefault();
                    fetch(`http://localhost:3000/services/${treatment.id}`, {
                        method: "DELETE"
                    })
                        .then(() => {
                            serviceCard.remove();
                        });
                });

                function fullUpdate() {
                    getUserDetails();
                    getServiceChosen();
                }
                fullUpdate();

                function getServiceChosen() {
                    fetch("http://localhost:3000/serviceChosen")
                        .then(response => response.json())

                        .then(services => {

                            if (services.length > 0) {
                                document.querySelectorAll(".update").forEach(upt => upt.remove());
                            }

                            services.forEach(service => {
                                let update = document.createElement("div");
                                update.className = "update";
                                update.innerHTML = `
                                    <p><strong>Selected service: </strong>${service.name}</p>
                                    <p><strong>Charge: </strong>${service.cost}</P>
                                    <p><strong>Time of service: </strong>${service.time}</P>
                  
                                    <button class="dlt">Delete</button>
                                `;
                                update.style.background = "#A8C3A8";
                                update.style.borderRadius = "5px";
                                update.style.border = "1px solid black";
                                update.style.padding = "5px";
                                update.style.marginTop = "5px";

                                serviceInfo.appendChild(update);
                                const dltButton = update.querySelector(".dlt");
                                dltButton.addEventListener("click", function (e) {
                                    e.preventDefault();
                                    fetch(`http://localhost:3000/serviceChosen/${service.id}`, {
                                        method: "DELETE"
                                    })
                                        .then(() => {
                                            update.remove();
                                        })
                                })
                            })
                        })
                }
                const bookButton = serviceCard.querySelector(".book");
                bookButton.addEventListener("click", function (e) {
                    e.preventDefault();

                    fetch("http://localhost:3000/serviceChosen", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: treatment.service_name,
                            time: treatment.time_schedule,
                            cost: treatment.cost
                        })

                    })
                        .then(response => response.json())
                        .then(() => {
                            getServiceChosen();
                        });
                })
            })

        });

    function getUserDetails() {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(userDetails => {

                document.querySelectorAll(".userCard").forEach(el => el.remove());

                userDetails.forEach(user => {

                    const users = document.createElement("div");

                    console.log(user);
                    users.classname = "userCard"
                    users.innerHTML = `
                         <div class="userCard" id=${user.id}>
                        <p class="name"><strong>Name:</strong>${user.name}<br/></p>
                        <p class="email"><strong>Email:</strong> ${user.email}<br/></p>
                        <p class="phone"><strong>Phone Number:</strong> ${user.phone}<br/></p>
                        <button class="change">Update</button>
                        <button class="remove">Remove</button>
                        </div>
                    `;
                    users.style.marginTop ="25px";

                    clientInfo.appendChild(users);

                    const removeButton = users.querySelector(".remove");
                    removeButton.addEventListener("click", function (e) {
                        e.preventDefault();
                        fetch(`http://localhost:3000/users/${user.id}`, {
                            method: "DELETE"
                        })
                            .then(() => {
                                users.remove();
                            })
                    })

                    const changeButton = users.querySelector(".change");
                    changeButton.addEventListener("click", function (e) {
                        e.preventDefault();
                        //display the modal
                        document.getElementById("updated-modal").style.display = "block";
                        //update the data
                        document.getElementById("newName").value = user.name;
                        document.getElementById("newEmail").value = user.email;
                        document.getElementById("newPhone").value = user.phone;
                        //update changes when the button save changes is clicked.
                        document.getElementById("save-update").onclick = function (e) {
                            e.preventDefault();

                            const newName = document.getElementById("newName").value;
                            const newEmail = document.getElementById("newEmail").value;
                            const newContact = document.getElementById("newPhone").value;


                            fetch(`http://localhost:3000/users/${user.id}`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    name: newName,
                                    email: newEmail,
                                    phone: newContact
                                })

                            })
                                .then(response => response.json())
                                .then(userUpdate => {
                                    users.querySelector(".name").innerHTML = `Name: ${userUpdate.name}`;
                                    users.querySelector(".email").innerHTML = `Email: ${userUpdate.email}`;
                                    users.querySelector(".phone").innerHTML = `Phone: ${userUpdate.phone}`;

                                })


                        };
                    })
                });
            })
            .catch(error => error);
    }

    document.querySelector(".close").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("updated-modal").style.display = "none";
    })
    //getUserDetails();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const contact = document.getElementById("phone");

        const userName = name.value.trim();
        const userEmail = email.value.trim();
        const userContact = contact.value;

        if (userName && userEmail && userContact) {
            const users = document.createElement("div");

            users.innerHTML = `
            <p class="name"><strong>Name:</strong>${userName}<br/></p>
            <p class="email"><strong>Email:</strong> ${userEmail}<br/></p>
            <p class="phone"><strong>Phone Number:</strong> ${userContact}</p>
            <button class="change">Update</button>
            <button class="remove">Remove</button>
                `;
            

            clientInfo.appendChild(users);


            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: userName,
                    email: userEmail,
                    phone: userContact
                }),
            })
                .then(response => response.json())
                .then(userdtls => {

                    const removeButton = users.querySelector(".remove");
                    removeButton.addEventListener("click", function (e) {
                        e.preventDefault();
                        fetch(`http://localhost:3000/users/${userdtls.id}`, {
                            method: "DELETE"
                        })
                            .then(() => {
                                users.remove();
                            })

                    })

                    const changeButton = users.querySelector(".change");
                    changeButton.addEventListener("click", function (e) {
                        e.preventDefault();
                        //display the modal
                        document.getElementById("updated-modal").style.display = "block";
                        //update the data
                        document.getElementById("newName").value = userdtls.name;
                        document.getElementById("newEmail").value = userdtls.email;
                        document.getElementById("newPhone").value = userdtls.phone;
                        //update changes when the button save changes is clicked.
                        document.getElementById("save-update").onclick = function (e) {
                            e.preventDefault();

                            const newName = document.getElementById("newName").value;
                            const newEmail = document.getElementById("newEmail").value;
                            const newContact = document.getElementById("newPhone").value;


                            fetch(`http://localhost:3000/users/${userdtls.id}`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    name: newName,
                                    email: newEmail,
                                    phone: newContact
                                })

                            })
                                .then(response => response.json())
                                .then(userUpdate => {
                                    users.querySelector(".name").innerHTML = `Name: ${userUpdate.name}`;
                                    users.querySelector(".email").innerHTML = `Email: ${userUpdate.email}`;
                                    users.querySelector(".phone").innerHTML = `Phone: ${userUpdate.phone}`;

                                })

                        }
                    })


                })



            form.reset();

        }

    })

    const reviews = document.getElementById("updated-reviews");
    const reviewsForm = document.getElementById("reviews-form");

    reviewsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const reviewUser = document.getElementById("name-review");
        const addedReview = document.getElementById("reviews");

        const userRvw = reviewUser.value.trim();
        const addedRvm = addedReview.value.trim();

        if (userRvw && addedRvm) {
            const reviewCard = document.createElement("div");
            reviewCard.innerHTML = `
            <p><strong>Client Name: </strong>${userRvw}</p>
            <p><strong>Review: </strong>${addedRvm}</P>
            <button class="delete-review"> Delete Review</button>
            `;
            reviewCard.style.borderRadius = "5px";
            reviewCard.style.padding = "10px";
            reviewCard.style.border = "1px solid #333";
            reviewCard.style.marginTop = "20px";
            reviewCard.style.boxShadow = "2px 2px 5px #333";
            reviewCard.style.background = "#f0ede4";
            reviewCard.style.width = "300px";


            reviews.appendChild(reviewCard);

            fetch("http://localhost:3000/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client: userRvw,
                    review: addedRvm
                })
            })
                .then(response => response.json())
                .then(reviewdtls => {
                    const deleteReview = reviewCard.querySelector(".delete-review");

                    deleteReview.addEventListener("click", (e) => {
                        e.preventDefault();

                        fetch(`http://localhost:3000/reviews/${reviewdtls.id}`, {
                            method: "DELETE"
                        })
                            .then(() => {
                                reviewCard.remove();

                            })
                    })
                })
            reviewsForm.reset();
        }
    })

    function getReview() {
        fetch("http://localhost:3000/reviews")
            .then(response => response.json())
            .then(reviewDetails => {

                document.querySelectorAll(".review-card").forEach(el => el.remove());

                reviewDetails.forEach(review => {
                    const reviewCard = document.createElement("div");
                    reviewCard.className = "review-card";
                    reviewCard.innerHTML = `
                   <p><strong>Client Name: </strong>${review.client}</p>
                   <p><strong>Review: </strong>${review.review}</P>
                   <button class="delete-review"> Delete Review</button>
                 `;

                    reviews.appendChild(reviewCard);

                    const deleteReview = reviewCard.querySelector(".delete-review");

                    deleteReview.addEventListener("click", (e) => {
                        e.preventDefault();

                        fetch(`http://localhost:3000/reviews/${review.id}`, {
                            method: "DELETE"
                        })
                            .then(() => {
                                reviewCard.remove();

                            })
                    })
                })
            })
    }
    getReview();


})