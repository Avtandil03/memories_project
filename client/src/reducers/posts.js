export default (posts = [], action ) => {
  switch (action.type) {
    case 'FETCH_ALL':
      console.log(action.payload + 'this action.payload')
      return action.payload
    case 'CREATE':
      console.log(posts, ' this is posts')
      return posts
    default: 
      return posts
  }
}