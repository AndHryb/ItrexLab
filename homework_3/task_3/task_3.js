class GetUsersFormApi{
    constructor(numOfUsers) {
        this.numOfUsers = numOfUsers;
    }
    async getUsers(){
        try {
            let users = async () => {
                let response = await  fetch(`https://randomuser.me/api/?results=${this.numOfUsers}`)
                let data = await response.json();
                //console.log(data)
                return data
            }

            let usersData = await users();
            let usersArr = usersData.results;
            usersArr.forEach((elem,i)=>{
                console.log(`
                            name: ${elem.name.title} ${elem.name.first} ${elem.name.last}
                            gender:${elem.gender}
                            location: country:${elem.location.country}, state:${elem.location.state},
                            city${elem.location.city}, street:${elem.location.street.name} ${elem.location.street.number}, postcode:${elem.location.postcode},
                            cordinates:latitude ${elem.location.coordinates.latitude} , longitude ${elem.location.coordinates.longitude}
                            user emal:${elem.email}
                            user login:${elem.login.username}  password:${elem.login.password}
                            user phone:${elem.phone}
                            day of bithday ${elem.dob.date}
                            age:${elem.dob.age}
                `)
            })

            } catch (err){
            console.log(err.name)
            }
    }

}



let anyUsers = new GetUsersFormApi(5);
console.log(anyUsers.getUsers())