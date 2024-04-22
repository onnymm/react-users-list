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

export const findAllUsers = async (signal) => {
    try {
        const response = await fetch('http://localhost:5180/users', {signal});

        let users;

        if (response.ok) users = await response.json();
        
        return {
            users,
            error: !response.ok,
            aborted: false
        }

    } catch(e) {
        const isAborted = e.name === 'AbortError';

        return {
            users: undefined,
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