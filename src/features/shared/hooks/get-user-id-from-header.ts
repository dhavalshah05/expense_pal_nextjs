import {headers} from "next/headers";

const getUserIdFromHeader = async () => {
    const nextHeaders = await headers();
    // This header will be added by middleware when user is authenticated for each request.
    const userId = nextHeaders.get("x-user-id");
    if (userId === null) {
        throw Error('UserId cannot be null here');
    }
    return userId
}

export default getUserIdFromHeader;
