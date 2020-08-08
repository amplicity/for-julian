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

class Favorites {

  static add(userId, designerId){
    let selectedUser = this.findUser(userId);
    if (selectedUser === undefined){
      return console.log('No user found for id: ', userId);
    }
    let selectedDesigner = this.findDesigner(designerId);
    if (selectedDesigner === undefined){
      return console.log('No designer found for id: ', designerId);
    }
    let favorite = JSON.stringify({userId:selectedUser.id, designerId:selectedDesigner.id})
    if (favorites.has(favorite)){
      return console.log('User ' + selectedUser.id + ' has already favorited designer ' + selectedDesigner.id);
    }
    this.logEvent(userId, 'Added favorite: ' + designerId);
    this.addToMostPopular(selectedDesigner.name);
    return favorites.add(favorite);
  }
  
  static remove(userId, designerId){
    let favorite = JSON.stringify({userId:userId, designerId:designerId})
    let deleteResult =  favorites.delete(favorite)
    if (deleteResult === true){
      this.logEvent(userId, 'Deleted a favorite: ' + designerId);
      let designerName = this.findDesigner(designerId).name;
      this.removeFromMostPopular(designerName);
    } else {
      console.log('User: ' + userId + ' has already removed designer: ' + designerId);
    }
  }
  
  static returnAll(userId) {
    let selectedUser = findUser(userId);
    if (selectedUser === undefined){
      return console.log('No user found');
    }
    let favoritesArray = Array.from(favorites).map(JSON.parse);
    let selectedUserFavorites = favoritesArray.filter(favorite => favorite.userId === userId);
    if (selectedUserFavorites === undefined){
      return console.log('No favorites found');
    }
    return console.log('Favorites for user: ' + selectedUser.id, favoritesArray.filter(favorite => favorite.userId == selectedUser.id));  
  }
  
  static getMostPopularDesigner(){
    return console.log('The most popular designer is: ' + mostPopularDesigners.sort((a,b) => b[1] - a[1])[0][0]);
  }
  
  static logEvent(userId, event){
    log.push({userId: userId, event: event});
  }
  
  static retrieveEvents(userId){
    return console.log('Log for User ' + userId, log.filter(event => event.userId === userId));
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
    let selectedDesigner = this.findMostPopularDesigner(designerName);
    selectedDesigner[1]-=1; 
  }
  
  static findUser(userId){
    return users.find(user => user.id === userId );
  }
  
  static findDesigner(designerId){
    return designers.find(designer => designer.id === designerId);
  }
  
  static findMostPopularDesigner(designerName){
    return mostPopularDesigners.find(designer => designer[0] === designerName);
  }
}
    
// Add favorite designers
Favorites.add(0, 1);
Favorites.add(23, 2);
Favorites.add(23, 1);
Favorites.add(11, 1);
Favorites.add(11, 2);
Favorites.add(0, 2);
Favorites.add(13, 2);
Favorites.add(23, 6);
Favorites.add(0, 6);
Favorites.add(11, 6);
Favorites.add(5, 6);
Favorites.add(13, 6);
Favorites.add(13,6);

// Favorites.remove(0,6);
// Favorites.remove(0,6);

// Favorites.remove(0,1);
// Favorites.remove(23,6);
// Favorites.remove(13,6);
// Favorites.remove(5,6);



// Output most popular designer.
Favorites.getMostPopularDesigner();


// Retrieve favorite history for user 0.
// retrieveEvents(0);