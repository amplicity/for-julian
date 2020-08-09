const designers = [
  { name: "Rick Owens", id: 1 },
  { name: "Supreme", id: 2 },
  { name: "Raf Simmons", id: 3 },
  { name: "Nike", id: 4 },
  { name: "Adidas", id: 5 },
  { name: "Balenciaga", id: 6 },
  { name: "APC", id: 7 },
  { name: "Off-White", id: 8 },
  { name: "Puma", id: 9 },
  { name: "Gucci", id: 10 },
]

const users = [
  { name: "James", id: 23 },
  { name: "Love", id: 0 },
  { name: "Irving", id: 11 },
  { name: "Smith", id: 5 },
  { name: "Thompson", id: 13 },
]

let log = [];
let favorites = new Set();
let mostPopularDesigners = [];

class Helpers {
  static findMostPopularDesigner(designerName){
    return mostPopularDesigners.find(designer => designer[0] === designerName);
  }
  
  static findUser(userId){
    return users.find(user => user.id === userId );
  }
  
  static findDesigner(designerId){
    return designers.find(designer => designer.id === designerId);
  }
  
  static textOutput(type, params){
    switch(type){
      case 'NoUserId':
        console.log('No user found for id: ', params.userId)
        break;
      case 'NoDesignerId':
        console.log('No designer found for id: ', params.designerId);
        break;
      case 'AlreadyFavorited':
        console.log('User ' + params.userId + ' has already favorited designer ' + params.designerId);
        break;
      case 'AlreadyRemoved':
        console.log('User: ' + params.userId + ' has no favorited designer: ' + params.designerId);
        break;
      case 'NoFavorites':
        console.log('No favorites found');
        break;
      case 'AllUserFavorites':
        console.log('Favorites for user: ' + params.userId, params.selectedUserFavorites.map(favorite => favorite.designerId));  
        break;
      case 'RetrieveLog':
        console.log('Log for User ' + params.userId, log.filter(event => event.userId === params.userId).map(event => event.event));
        break;
      case 'MostPopularDesigner':
        if (mostPopularDesigners.length > 0){  
          console.log('The most popular designer is: ' + mostPopularDesigners.sort((a,b) => b[1] - a[1])[0][0]);
        } else {
          console.log('No designers have been favorited yet.');
        }
        break;
    }
  }
}


class Favorites {

  static add(userId, designerId){
    let selectedUser = Helpers.findUser(userId);
    let params = {userId: userId, designerId: designerId};
    if (selectedUser === undefined){
      return Helpers.textOutput('NoUserId', params);
    }
    let selectedDesigner = Helpers.findDesigner(designerId);
    if (selectedDesigner === undefined){
      return Helpers.textOutput('NoDesignerId',params);
    }
    let favorite = JSON.stringify({userId:selectedUser.id, designerId:selectedDesigner.id})
    if (favorites.has(favorite)){
      return Helpers.textOutput('AlreadyFavorited', params);
    }
    this.logEvent(userId, 'Added favorite: ' + designerId);
    this.addToMostPopular(selectedDesigner.name);
    return favorites.add(favorite);
  }
  
  static remove(userId, designerId){
    let params = {userId: userId, designerId: designerId}
    let favorite = JSON.stringify({userId:userId, designerId:designerId})
    let deleteResult =  favorites.delete(favorite)
    if (deleteResult === true){
      this.logEvent(userId, 'Deleted a favorite: ' + designerId);
      let designerName = Helpers.findDesigner(designerId).name;
      this.removeFromMostPopular(designerName);
    } else {
      return Helpers.textOutput('AlreadyRemoved', params);
    }
  }
  
  static returnAll(userId) {
    let selectedUser = Helpers.findUser(userId);
    if (selectedUser === undefined){
      return Helpers.textOutput('NoUserId',params);
    }
    let favoritesArray = Array.from(favorites).map(JSON.parse);
    let selectedUserFavorites = favoritesArray.filter(favorite => favorite.userId === userId);
    if (selectedUserFavorites.length === 0){
      return Helpers.textOutput('NoFavorites');
    }
    let params = {userId:userId, selectedUserFavorites: selectedUserFavorites};
    return Helpers.textOutput('AllUserFavorites', params);
  }
  
  static logEvent(userId, event){
    log.push({userId: userId, event: event});
  }
  
  static retrieveEvents(userId){
    let params = {userId:userId};
    return Helpers.textOutput('RetrieveLog', params);
  }
  
  static addToMostPopular(designerName){
    let selectedDesigner = mostPopularDesigners.find(designer => designer[0] === designerName);
    if (selectedDesigner === undefined){
      mostPopularDesigners.push([designerName,1]);
    } else {
      selectedDesigner[1]+=1;
    }
  }
  
  static removeFromMostPopular(designerName){
    let selectedDesigner = Helpers.findMostPopularDesigner(designerName);
    selectedDesigner[1]-=1; 
  }
  
  static getMostPopularDesigner(){
    return Helpers.textOutput('MostPopularDesigner');
  }
  
}
    
// Add favorite designers
// Favorites.add(23, 2);
// Favorites.add(23, 2);
// Favorites.add(23, 1);
// Favorites.add(11, 1);
// Favorites.add(11, 2);
// Favorites.add(0, 2);
// Favorites.add(13, 2);
// Favorites.add(23, 6);
// Favorites.add(0, 6);
// Favorites.add(11, 6);
// Favorites.add(5, 6);
// Favorites.add(13, 6);
// Favorites.add(13,6);

// Favorites.remove(0,6);
// Favorites.remove(0,6);

Favorites.remove(0,1);
// Favorites.remove(23,6);
// Favorites.remove(13,6);
// Favorites.remove(5,6);

// Favorites.returnAll(23);


// Output most popular designer.
Favorites.getMostPopularDesigner();


// Retrieve favorite history for user 0.
Favorites.retrieveEvents(23);