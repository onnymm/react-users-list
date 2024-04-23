import { SORT_OPTIONS } from "../../constants/sortOptions";

export const createUser = async (user) => {
    try {
        const response = await fetch(
            'http://localhost:5180/users',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
        )
        return response.ok;
    } catch {
        return false;
    }
}

export const updateUser = async (user) => {
    try {
        const response = await fetch(
            `http://localhost:5180/users/${user.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
        )
        return response.ok;
    } catch {
        return false;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await fetch(
            `http://localhost:5180/users/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        return response.ok;
    } catch {
        return false;
    }
}

const getFindAllUrl = ({page, itemsPerPage, search, onlyActive, sortBy}) => {
    const url = new URL('http://localhost:5180/users')
    url.searchParams.append('_page', page);
    url.searchParams.append('_limit', itemsPerPage);

    if(search) url.searchParams.append('name_like', search);
    if(onlyActive) url.searchParams.append('active', true)

    if (sortBy === SORT_OPTIONS.NAME){
        url.searchParams.append('_sort', 'name');
        url.searchParams.append('_order', 'asc')
    }
    else if (sortBy === SORT_OPTIONS.ROLE){
        url.searchParams.append('_sort', 'role');
        url.searchParams.append('_order', 'desc')
    }
    else if (sortBy === SORT_OPTIONS.ACTIVE){
        url.searchParams.append('_sort', 'active');
        url.searchParams.append('_order', 'desc')
    }

    return (url.href)
}

export const findAllUsers = async (signal, filters) => {
    const url = getFindAllUrl({...filters})
    
    try {
        const response = await fetch(url, {signal});

        let users;

        if (response.ok) users = await response.json();
        
        return {
            users,
            count: response.ok ? response.headers.get('x-total-count') : 0,
            error: !response.ok,
            aborted: false
        }

    } catch(e) {
        const isAborted = e.name === 'AbortError';

        return {
            users: undefined,
            count: 0,
            error: !isAborted,
            aborted: isAborted
        }
    }
}

export const findUserByUsername = async (username, signal) => {
    try {
        const response = await fetch(`http://localhost:5180/users?username=${username}`, { signal })

        let user;

        if (response.ok) {
            const users = await response.json();
            user = users[0]
        }
        
        return {
            user,
            error: !response.ok,
            aborted: false
        }

    } catch(e) {
        const isAborted = e.name === 'AbortError';

        return {
            user: undefined,
            error: !isAborted,
            aborted: isAborted
        }
    }
}