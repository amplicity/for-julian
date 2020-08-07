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

// Allow user to favorite designers.
let favoriteDesigner = (userId, designerId) => {
  try{
    let selectedUser = users.find(user => user.id == userId );
    if (selectedUser === undefined){
      return console.log('No user found for id: ', userId);
    }
    let selectedDesigner = designers.find(designer => designer.id == designerId);
    if (selectedDesigner === undefined){
      return console.log('No designer found for id: ', designerId);
    }
    let favorite = JSON.stringify({userId:selectedUser.id, designerId:selectedDesigner.id})
    if (favorites.has(favorite)){
      return console.log('User ' + selectedUser.id + ' has already favorited designer ' + selectedDesigner.id);
    }
    logEvent(userId, 'Added favorite: ' + designerId);
    return favorites.add(favorite);
  } catch (error){
    console.error(error);
  }
}

// Remove a specific favorite from a user.
let removeFavorite = (userId, designerId) => {
  let favorite = JSON.stringify({userId:userId, designerId:designerId})
  let deleteResult =  favorites.delete(favorite)
  if (deleteResult === true){
    console.log('Removed user id: '+ userId + ' and designer id: ' + designerId + ' favorite.');
    logEvent(userId, 'Deleted a favorite: ' + designerId);
  } else {
    console.log('Cannot remove favorite for user id: ' + userId + ' and designer id: ' + designerId +'...it has been previously deleted.');
  }
}

// Return all designers a user has favorited.
let returnFavorites = (userId) =>{
    try{
      let selectedUser = users.find(user => user.id === userId );
      if (selectedUser === undefined){
        return console.log('No user found');
      }
      let favoritesArray = Array.from(favorites).map(JSON.parse);
      let selectedUserFavorites = favoritesArray.filter(favorite => favorite.userId === userId);
      if (selectedUserFavorites === undefined){
        return console.log('No favorites found');
      }
      return console.log('Favorites for user: ' + selectedUser.id, favoritesArray.filter(favorite => favorite.userId == selectedUser.id));
    } catch (error){
      console.error(error);
    }  
}

// Find the most popular designer with one loop and 2d array.
let mostPopularDesigner = () => {
  let favoritesArray = Array.from(favorites).map(JSON.parse).sort((a,b) => a.designerId - b.designerId);
  let designersRanked = [];
  for (i=0; i < favoritesArray.length; i++){
    let designerId = favoritesArray[i].designerId;
    let designerName = designers.find(designer => designer.id === designerId).name;
    let currentDesigner = designersRanked.find(designer => designer[0] == designerName);
    if (currentDesigner === undefined){
      designersRanked.push([designerName, 1]);
    } else {
      currentDesigner[1] += 1;
    }
  }
  return console.log('The most popular designer is:  ' + designersRanked.sort((a,b) => b[1] - a[1])[0][0]);
}

// Add a feature to log adds/removals
let logEvent = (userId, event) => {
  log.push({userId: userId, event: event});
}

// Add a way to print log for the user                
let retrieveEvents = (userId) =>{
  return console.log('Log for User ' + userId, log.filter(event => event.userId === userId));
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

// Try to remove duplicate favorites, check that it does not
// appear in log twice.
removeFavorite(0,1);
removeFavorite(0,1);

// Build 2d array and output most popular designer.
mostPopularDesigner();

// Retrieve favorite history for user 0.
retrieveEvents(0);