export class Api{
    constructor(url){
        this._URL = url;
        // this._token = token;
        this._headers = {
            'Content-Type': 'application/json',
            //authorization: this._authorization,

        }
    }

    _checkResponse(res){
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        }

    getUserData(){
        return fetch(`${this._URL}/users/me`,{
            headers: this._headers,
            method: 'GET',
            credentials:"include",
        })
        .then(this._checkResponse) 
    }



    updateUserData(user){
        const body = {
            name: user.name,
            about: user.about
        };
        return fetch(`${this._URL}/users/me`,{
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(body),
            credentials:"include",
        })
        .then(this._checkResponse) 
    }

    getCardsData(){
        return fetch(`${this._URL}/cards`,{
            headers: this._headers,
            credentials:"include",
        })
        .then(this._checkResponse) 
      
    }

    addCard(card){
        const body = {
            name: card.name,
            link: card.link
        };
        return fetch(`${this._URL}/cards`,{
            headers: this._headers,
            method: 'POST',
            credentials:"include",
            body: JSON.stringify(body),
        })
        .then(this._checkResponse) 
    }

    deleteCard(cardId){
        return fetch(`${this._URL}/cards/`+ cardId,{
            headers: this._headers,
            method: 'DELETE',
            credentials:"include",
        })
        .then(this._checkResponse) 
    }

    updateLike(cardId, method){
        return fetch(`${this._URL}/cards/${cardId}/likes`,{
            headers: this._headers,
            method,
            credentials:"include",
        })
        .then(this._checkResponse) 
    }

    updateAvatar(user){
        const body = {
            avatar: user.avatar
        };
        return fetch(`${this._URL}/users/me/avatar` ,{
            headers: this._headers,
            method: 'PATCH',
            credentials:"include",
            body: JSON.stringify(body),
        })
        .then(this._checkResponse) 
    }


}

export const api = new Api('http://localhost:4000');