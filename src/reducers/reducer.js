const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filterLoadingStatus: 'idle',
    filters: [],
    filteredElements: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }

        case 'FILTER_FETCHING':
            return {
                ...state,
                filterLoadingStatus: 'loading'
            }  
        case 'FILTER_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filterLoadingStatus: 'idle'
            }
        case 'FILTER_FETCHING_ERROR':
            return {
                ...state,
                filterLoadingStatus: 'error'
            }          

        case 'HERO_DELETE':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }    

            case 'HERO_ADD':
                return {
                    ...state,
                    heroes: [...action.payload] ,
                    heroesLoadingStatus: 'idle'
                }       
            case 'ELEMENT_ADD':
                return {
                    ...state,
                    filteredElements: action.payload
                  
                }       
        
        default: return state
    }
}

export default reducer;