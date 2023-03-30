import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_BY_ID } from "../constants/actionTypes"

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {posts: [], isLoading: false}, action ) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading:true}
    case END_LOADING:
      return {...state, isLoading:false}
    case FETCH_BY_ID:
      return { ...state, post: action.payload  }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages
      }
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload]}
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case LIKE:
      return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)}
    case DELETE:
      return { ...state, posts: state.posts.filter(post => post._id !== action.payload )}
    default: 
      return state
  }
}