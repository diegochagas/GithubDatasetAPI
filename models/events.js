function createEvent (id, type, actorID, actorLogin, actorAvatarURL, repoID, repoName, repoURL, createdAt) {
    const event = {
        id: id,
        type: type,
        actor: {
            id: actorID,
            login: actorLogin,
            avatar_url: actorAvatarURL
        },
        repo: {
            id: repoID,
            name: repoName,
            url: repoURL
        },
        created_at: createdAt
    };
    return event;
};

module.exports = {
    createEvent: createEvent
};
