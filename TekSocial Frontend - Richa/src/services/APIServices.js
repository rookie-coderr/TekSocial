const ENDPOINT = "http://localhost:8083";

const callAndReturn = (endPoint, options) => {
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

export const uploadProfileImage = async (formData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
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
    },
  };
  return callAndReturn(`/profile/${id}`, options);
};

export const deleteFriend = (id=3,userId) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return callAndReturn(`/deletefriendrequest/${userId}/${id}`, options);
};

export const getAllFriends = (id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return callAndReturn(`/getallfriends/${id}`, options);
};


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
    },
    body: JSON.stringify(data),
  };
  return callAndReturn(`/profile`, options);
};

export const getSearchedProfiles = (searckKey)=> {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return callAndReturn(`/getallusers?searchkey=${searckKey}`, options);
}
export const getAllFriendRequests = (id)=> {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return callAndReturn(`/getallrequests/${id}`, options);
}
export const sendFriendRequest = (profileId, userId)=> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return callAndReturn(`/sendrequest/${profileId}/${userId}`, options);
}
export const acceptFriendRequest = (profileId, userId)=> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return callAndReturn(`/acceptrequest/${profileId}/${userId}`, options);
}

