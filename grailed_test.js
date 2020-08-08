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

// Allow user to favorite designers.
let favoriteDesigner = (userId, designerId) => {
    let selectedUser = findUser(userId);
    if (selectedUser === undefined){
      return console.log('No user found for id: ', userId);
    }
    let selectedDesigner = findDesigner(designerId);
    if (selectedDesigner === undefined){
      return console.log('No designer found for id: ', designerId);
    }
    let favorite = JSON.stringify({userId:selectedUser.id, designerId:selectedDesigner.id})
    if (favorites.has(favorite)){
      return console.log('User ' + selectedUser.id + ' has already favorited designer ' + selectedDesigner.id);
    }
    logEvent(userId, 'Added favorite: ' + designerId);
    addToMostPopular(selectedDesigner.name);
    return favorites.add(favorite);
}

// Remove a specific favorite from a user.
let removeFavorite = (userId, designerId) => {
    let favorite = JSON.stringify({userId:userId, designerId:designerId})
    let deleteResult =  favorites.delete(favorite)
    if (deleteResult === true){
      logEvent(userId, 'Deleted a favorite: ' + designerId);
      let designerName = findDesigner(designerId).name;
      removeFromMostPopular(designerName);
    } else {
      console.log('User: ' + userId + ' has already removed designer: ' + designerId);
    }
}

// Return all designers a user has favorited.
let returnFavorites = (userId) =>{
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

// Find the most popular designer with one loop and 2d array.
let getMostPopularDesigner = () => {
    return console.log('The most popular designer is: ' + mostPopularDesigners.sort((a,b) => b[1] - a[1])[0][0]);
}

// Add a feature to log adds/removals
let logEvent = (userId, event) => {
  log.push({userId: userId, event: event});
}

// Add a way to print log for the user                
let retrieveEvents = (userId) =>{
  return console.log('Log for User ' + userId, log.filter(event => event.userId === userId));
}

let addToMostPopular = (designerName) => {
  let selectedDesigner = mostPopularDesigners.find(designer => designer[0] === designerName);
  if (selectedDesigner === undefined){
    mostPopularDesigners.push([designerName,1]);
  } else {
    selectedDesigner[1]+=1;
  }
}

let removeFromMostPopular = (designerName) => {
  let selectedDesigner = findMostPopularDesigner(designerName);
  selectedDesigner[1]-=1;
}

let findUser = (userId) =>{
  return users.find(user => user.id === userId );
}

let findDesigner = (designerId) => {
  return designers.find(designer => designer.id === designerId);
}

let findMostPopularDesigner = (designerName) => {
  return mostPopularDesigners.find(designer => designer[0] === designerName);
}
    
// Add favorite designers
favoriteDesigner(0, 1);
favoriteDesigner(23, 2);
favoriteDesigner(23, 1);
favoriteDesigner(11, 1);
favoriteDesigner(11, 2);
favoriteDesigner(0, 2);
favoriteDesigner(13, 2);
favoriteDesigner(23, 6);
favoriteDesigner(0, 6);
favoriteDesigner(11, 6);
favoriteDesigner(5, 6);
favoriteDesigner(13, 6);
favoriteDesigner(13,6);

removeFavorite(0,6);
removeFavorite(0,6);

removeFavorite(0,1);
removeFavorite(23,6);
removeFavorite(13,6);
removeFavorite(5,6);



// Output most popular designer.
getMostPopularDesigner();
console.log('favorites', favorites);
console.log('mostPopularDesigners', mostPopularDesigners);

// Retrieve favorite history for user 0.
// retrieveEvents(0);