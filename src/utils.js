//Includes all request to server

//Login api
export const login = credential => {
    const {username, password} = credential;
    const loginUrl = `/login?username=${username}&password=${password}`;

    //fetch : make request to server, then : receive response promise
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"  //include : include cookie in the request
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to log in");
        }
    });
};

//Sign up api
export const signup = (data) => {
    const signupUrl = "/signUp";

    return fetch(signupUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to sign up");
        }
    });
};

//Fetch restaurant api
export const getRestaurants = () => {
    return fetch("/restaurants").then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get restaurants");
        }

        return response.json();
    });
};

//Fetch menu api
export const getMenus = (restId) => {
    return fetch(`/restaurant/${restId}/menu`).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get menus");
        }

        return response.json();
    });
};

//Fetch cart api
export const getCart = () => {
    return fetch("/cart").then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get shopping cart data");
        }

        return response.json();
    });
};

//Check out api
export const checkout = () => {
    return fetch("/checkout").then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to checkout");
        }
    });
};

//Add item to cart api
export const addItemToCart = (itemId) => {
    return fetch(`/order/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to add menu item to shopping cart");
        }
    });
};