const ENDPOINT = "http://localhost:8083";

const token = JSON.parse(localStorage.getItem('user')).jwtToken;

const callAndReturn = (endPoint, options) => {
//  const token = localStorage.getItem("token");


  return new Promise((resolve, reject) => {
    fetch(ENDPOINT + endPoint, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          resolve(response);
        } else {
          reject(response);
        }
      });
  });
};

export const authenticateUser =  (email, password) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"email":email, "password": password }),
  };
  return callAndReturn(`/authenticate`, options);
};

export const registerUser =  (email, password, confirmPassword) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({ "email":email, "password": password , "confirm_password" : confirmPassword}),
    // body: JSON.stringify({ email, password , confirmPassword }),
  };
 
  return callAndReturn(`/register`, options);
  
};


export const uploadProfileImage = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  };
  return callAndReturn(`/profile/image/upload`, options);
};


export const getDataForUser = (id) => {
  
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  };
  return callAndReturn(`/profile/${id}`, options);
};

export const deleteFriend = (id,userId) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  };
  return callAndReturn(`/deletefriendrequest/${userId}/${id}`, options);
};

export const getAllFriends = (id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  };
  return callAndReturn(`/getallfriends/${id}`, options);
};

export const getSearchedProfiles = (searckKey)=> {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  };
  return callAndReturn(`/getallusers?searchkey=${searckKey}`, options);
}

export const getAllFriendRequests = (id)=> {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  };
  return callAndReturn(`/getallrequests/${id}`, options);
}

export const sendFriendRequest = (profileId, userId)=> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  };
  return callAndReturn(`/sendrequest/${profileId}/${userId}`, options);
}

export const acceptFriendRequest = (profileId, userId)=> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  };
  return callAndReturn(`/acceptrequest/${profileId}/${userId}`, options);
}


export const updateDataForUser = (
  id,
  userName,
  email,
  firstName,
  lastName,
  userContact,
  userAbout,
  age,
  city,
  state
) => {
  const data = {
    id: id,
    userName: userName,
    email: email,
    firstName: firstName,
    lastName: lastName,
    userContact: userContact,
    userAbout: userAbout,
    age: age,
    city: city,
    state: state,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  };
  return callAndReturn(`/profile`, options);
};






