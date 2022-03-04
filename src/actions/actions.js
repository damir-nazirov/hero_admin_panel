export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}



export const filterFetching = () => {
    return {
        type: 'FILTER_FETCHING',
    }
}

export const filterFetched = (filters) => {
    return {
        type: 'FILTER_FETCHED',
        payload: filters
    }
}

export const filterFetchingError = () => {
    return {
        type: 'FILTER_FETCHING_ERROR',
    }
}

export const heroDelete = (heroes) => {
    return {
        type: 'HERO_DELETE',
        payload: heroes
    }
}


export const heroAdd = (hero) => {
    return {
        type: 'HERO_ADD',
        payload: hero
    }
}


export const addElementToFilter = (element) => {
    return {
        type: 'ELEMENT_ADD',
        payload: element
    }
}


