import cookie from "js-cookie";

// Set In Cookie
export const setCookie = (key,value) =>{
  if (window !== "undefined"){
    cookie.set(key,value,{
      // 1day
      expires:1
    })
  }
}

// Remove from Cookie
export const removeCookie = key =>{
  if (window !== "undefined"){
    cookie.remove(key,{
      expires:1
    })
  }
}

// Get From Cookie Like Token 
export const getCookie = key =>{
  if (window !== "undefined"){
    return cookie.get(key);
  }
}

// set in localstorge
export const setLocalStorage = (key,value) =>{
  if (window !== "undefined"){
    localStorage.setItem(key,JSON.stringify(value))
  }
}

// Remove from LocalStrorag
export const removeLocalStorage = key =>{
  if (window !== "undefined"){
    localStorage.removeItem(key);
  }
}

// Auth user after Login
export const authenticate = (response,next) =>{
  setCookie('token',response.data.token);
  setLocalStorage('user',response.data.user);
  next();
}

// SignOut
export const signout = next =>{
  removeCookie('token');
  removeLocalStorage('user');
  next();
}

// Fet user Info From LocalStorage
export const isAuth = () =>{
  if (window !== "undefined"){
    const cookieChecked = getCookie('token');
    if(cookieChecked){
      if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'));
      }else{
        return false
      }
    }
  }
}

// Update User Data in LocalStorage
export const updateUser = (response,next) =>{
  console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
  if (window !== "undefined"){
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data;
    localStorage.setItem('user',JSON.stringify(auth)); 
  }
  next();
}