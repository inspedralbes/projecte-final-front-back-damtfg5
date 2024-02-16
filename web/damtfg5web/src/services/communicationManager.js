export async function log(username, password) {
  const response = await fetch("http://tsg5.dam.inspedralbes.cat:3001/authorizationLogin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mail: username,
      password: password,
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Error en la solicitud: ${response.status} - ${response.statusText}`
    );
  }
  const data = await response.json();
  return { ...data };
}

export async function flights(body) {
  const response = await fetch("http://tsg5.dam.inspedralbes.cat:3001/flights/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(
      `Error en la solicitud: ${response.status} - ${response.statusText}`
    );
  }
  const data = await response.json();
  return { ...data };
}

export async function hotelListing(body) {
  const response = await fetch("http://tsg5.dam.inspedralbes.cat:3001/hotelsListing/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(
      `Error en la solicitud: ${response.status} - ${response.statusText}`
    );
  }
  const data = await response.json();
  return { ...data };
}

export async function hotelOffers(body) {
  const response = await fetch("http://tsg5.dam.inspedralbes.cat:3001/hotelOffers/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(
      `Error en la solicitud: ${response.status} - ${response.statusText}`
    );
  }
  const data = await response.json();
  return { ...data };
}
